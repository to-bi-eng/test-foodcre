import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  let connection;
  try {
    const { name, email, subject, content } = await request.json();

    if (!name || !email || !subject || !content) {
      return NextResponse.json({ error: '必須項目が不足しています。' }, { status: 400 });
    }

    connection = await mysql.createConnection({
      host: 'db',
      user: 'root',
      password: 'password',
      database: 'foocre_development',
      port: 3306,
    });

    await connection.execute(
      'INSERT INTO inquiry (user_id, name, email, title, content) VALUES (?, ?, ?, ?, ?)',
      [null, name, email, subject, content]
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: '【はちぽ】お問い合わせ送信完了のお知らせ',
      text: `
${name} 様

お問い合わせいただき、ありがとうございます。
以下の内容で、お客様からのお問い合わせが正常に送信されましたことをお知らせいたします。

内容を確認の上、担当者より改めてご連絡いたしますので、今しばらくお待ちください。

--- 送信内容 ---
お名前: ${name}
メールアドレス: ${email}
件名: ${subject}
内容:
${content}
--------------------
`,
    };

    await transporter.sendMail(mailOptions);

    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        const slackPayload = {
          text: `新規のお問い合わせがありました！\n\n*お名前:*\n${name}\n\n*メールアドレス:*\n${email}\n\n*件名:*\n${subject}\n\n*内容:*\n${content}`,
        };

        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(slackPayload),
        });
      } catch (slackError) {
        console.error('Slackへの通知に失敗しました:', slackError);
      }
    }

    return NextResponse.json({ message: 'お問い合わせを受け付けました。' });

  } catch (error) {
    console.error('お問い合わせ処理中にエラーが発生しました:', error);
    return NextResponse.json({ error: 'サーバー内部でエラーが発生しました。' }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}