import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: NextRequest) {
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

    let sql = `SELECT id, email, point, last_login_day, visit_at, created_at FROM users`;
    const params: (string | number)[] = [];

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
    // ★★★ ここからが修正箇所です ★★★
    console.error('API Error:', error);

    // 型ガード: errorがErrorオブジェクトのインスタンスかチェック
    if (error instanceof Error) {
      // Errorオブジェクトなら、安全に.messageプロパティにアクセスできる
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }

    // もしErrorオブジェクトでなかった場合のフォールバック処理
    return NextResponse.json({ message: "Internal Server Error", error: "An unknown error occurred" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}