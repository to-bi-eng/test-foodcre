import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    // 認証チェックなし、id=1のユーザーのポイントとメールアドレスを返す
    const userId = 1;

    const connection = await mysql.createConnection({
      host: "db",
      user: "root",
      password: "password",
      database: "foocre_development",
      port: 3306,
    });

    // emailも取得
    const query = 'SELECT point, email FROM users WHERE id = ?';
    const [rows] = await connection.execute(query, [userId]);
    await connection.end();

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = rows[0] as { point: number; email: string };

    return NextResponse.json({ points: user.point, email: user.email });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}