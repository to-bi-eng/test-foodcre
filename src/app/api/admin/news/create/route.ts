import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  let connection;
  try {
    const { title, content, status } = await request.json();

    connection = await mysql.createConnection({
      host: "db",
      user: "root",
      password: "password",
      database: "foocre_development",
      port: 3306,
    });

    await connection.execute(
      'INSERT INTO news (title, content, status) VALUES (?, ?, ?)',
      [title, content, status]
    );

    if (process.env.SLACK_LOGS_WEBHOOK_URL) {
      try {
        const slackPayload = {
          text: `新しいお知らせが作成されました！\n\n*タイトル:*\n${title}\n\n*内容:*\n${content}`,
        };

        await fetch(process.env.SLACK_LOGS_WEBHOOK_URL, {
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

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('ニュース作成APIでエラーが発生しました:', error);
    return NextResponse.json({ error: 'サーバー内部でエラーが発生しました。' }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}