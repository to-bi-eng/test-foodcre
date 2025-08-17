import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: "db",
  user: "root",
  password: "password",
  database: "foocre_development",
  port: 3306,
};

// GET: ユーザー一覧を取得（メールアドレスでの検索機能付き）
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const emailQuery = searchParams.get('email');

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    let sql = `SELECT id, email, point, last_login_day, visit_at, created_at FROM users`;
    const params: string[] = [];

    if (emailQuery) {
      sql += ` WHERE email LIKE ?`;
      params.push(`%${emailQuery}%`);
    }

    sql += ` ORDER BY id ASC`;

    const [rows] = await connection.execute(sql, params);

    const users = (rows as any[]).map(user => ({
      id: user.id,
      email: user.email,
      point: user.point ?? 0,
      last_login_day: user.last_login_day ? new Date(user.last_login_day).toISOString().slice(0, 19).replace('T', ' ') : null,
      visit_at: user.visit_at ? new Date(user.visit_at).toISOString().slice(0, 19).replace('T', ' ') : null,
      created_at: user.created_at ? new Date(user.created_at).toISOString().slice(0, 19).replace('T', ' ') : null,
    }));

    return NextResponse.json({ users });
  } catch (error) {
    console.error('API GET Users Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Internal Server Error", error: "An unknown error occurred" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

// PUT: ユーザーのポイント情報を更新
export async function PUT(request: NextRequest) {
  let connection;
  try {
    const { id, point } = await request.json();

    if (!id || point === undefined) {
      return NextResponse.json({ message: "User ID and point are required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);

    // Slack通知用に、更新対象のユーザー情報を取得
    const [userRows] = await connection.execute('SELECT email FROM users WHERE id = ?', [id]);
    const userItems = userRows as any[];
    if (userItems.length === 0) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userEmail = userItems[0].email;

    // ポイントを更新
    const sql = `UPDATE users SET point = ? WHERE id = ?`;
    const [result] = await connection.execute(sql, [point, id]);

    const updateResult = result as mysql.ResultSetHeader;

    if (updateResult.affectedRows > 0) {
      // Slack通知を送信
      if (process.env.SLACK_LOGS_WEBHOOK_URL) {
        try {
            const slackPayload = {
                text: `ユーザーのポイントが更新されました！\n\n*メールアドレス:*\n${userEmail}\n\n*新しいポイント:*\n${point}pt`,
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
      return NextResponse.json({ message: "User updated successfully" });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('API PUT User Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Internal Server Error", error: "An unknown error occurred" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

// DELETE: ユーザーを削除
export async function DELETE(request: NextRequest) {
  let connection;
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);

    // Slack通知用に、削除対象のユーザー情報を取得
    const [userRows] = await connection.execute('SELECT email FROM users WHERE id = ?', [id]);
    const userItems = userRows as any[];
    if (userItems.length === 0) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userEmail = userItems[0].email;

    // ユーザーを削除
    const sql = `DELETE FROM users WHERE id = ?`;
    const [result] = await connection.execute(sql, [id]);

    const deleteResult = result as mysql.ResultSetHeader;
    
    if (deleteResult.affectedRows > 0) {
      // Slack通知を送信
      if (process.env.SLACK_LOGS_WEBHOOK_URL) {
        try {
            const slackPayload = {
                text: `ユーザーが削除されました！\n\n*メールアドレス:*\n${userEmail}`,
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
      return NextResponse.json({ message: "User deleted successfully" });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('API DELETE User Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Internal Server Error", error: "An unknown error occurred" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}