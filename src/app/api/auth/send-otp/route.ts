import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  let connection;
  try {
    const { email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 10 * 60 * 1000;

    connection = await mysql.createConnection({
      host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
      user: '2aoEqC8LhLTsFQ2.root',
      password: 'oR04mhcWgKIFx97L',
      database: 'test',
      port: 4000,
    });

    await connection.execute('DELETE FROM otp_temp WHERE email = ?', [email]);
    await connection.execute(
      'INSERT INTO otp_temp (email, otp, pass, expires) VALUES (?, ?, ?, ?)',
      [email, otp, hashedPassword, expires]
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"【はちぽ】運営" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '【はちぽ】アカウント登録の確認コード',
      text: `あなたのワンタイムパスワードは ${otp} です。このパスワードは10分間有効です。`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'OTPを送信しました。' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'メールの送信に失敗しました。' }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}