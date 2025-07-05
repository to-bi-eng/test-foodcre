import { NextResponse, NextRequest } from 'next/server'; // ★ NextRequest をインポート
import mysql from 'mysql2/promise';

export async function GET(request: NextRequest) { // ★ request を引数で受け取る
  // ★ URLからemail検索クエリを取得
  const searchParams = request.nextUrl.searchParams;
  const emailQuery = searchParams.get('email');

  let connection;
  try {
    connection = await mysql.createConnection({
      host: "db",
      user: "root",
      password: "password",
      database: "foocre_development",
      port: 3306,
    });

    // ★ SQL文を動的に構築
    let sql = `SELECT id, email, point, last_login_day, visit_at, created_at FROM users`;
    const params: (string | number)[] = [];

    // もしemailクエリがあれば、WHERE句を追加
    if (emailQuery) {
      sql += ` WHERE email LIKE ?`;
      params.push(`%${emailQuery}%`); // 部分一致検索
    }

    sql += ` ORDER BY id ASC`;

    // ★ SQLとパラメータを渡して実行
    const [rows] = await connection.execute(sql, params);

    // 日付を「YYYY-MM-DD HH:MM:SS」形式の文字列に変換
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
    console.error('API Error:', error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}