import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
  user: '2aoEqC8LhLTsFQ2.root',
  password: 'oR04mhcWgKIFx97L',
  database: 'test',
  port: 4000,
};

export async function POST(request: Request) {
  let connection;
  try {
    const { title, content, status } = await request.json();

    connection = await mysql.createConnection(dbConfig);

    await connection.execute(
      'INSERT INTO news (title, content, status) VALUES (?, ?, ?)',
      [title, content, status]
    );

    if (process.env.SLACK_LOGS_WEBHOOK_URL) {
      try {
        const slackPayload = {
          text: `新しいお知らせが作成されました。\n\n*タイトル:*\n${title}\n\n*内容:*\n${content}`,
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

export async function DELETE(request: Request) {
  let connection;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);

    // Slack通知用に、削除するお知らせのタイトルを先に取得
    const [newsRows] = await connection.execute('SELECT title FROM news WHERE id = ?', [id]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newsItems = newsRows as any[];
    if (newsItems.length === 0) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }
    const newsTitle = newsItems[0].title;

    // お知らせを削除
    const [result] = await connection.execute(
      'DELETE FROM news WHERE id = ?',
      [id]
    );

    const a_result = result as mysql.ResultSetHeader;
    if (a_result.affectedRows > 0) {
      // Slack通知を送信
      if (process.env.SLACK_LOGS_WEBHOOK_URL) {
        try {
          const slackPayload = {
            text: `お知らせが削除されました！\n\n*タイトル:*\n${newsTitle}`,
          };
          await fetch(process.env.SLACK_LOGS_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(slackPayload),
          });
        } catch (slackError) {
          console.error('Slackへの通知に失敗しました:', slackError);
        }
      }
      return NextResponse.json({ message: "News deleted successfully" });
    } else {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('API DELETE Error:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}