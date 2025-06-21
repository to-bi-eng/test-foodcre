import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(req: NextRequest) {
  try {
    // クエリパラメータから userId を取得
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // DB接続
    const connection = await mysql.createConnection({
      host: "db",
      user: "root",
      password: "password",
      database: "foocre_development",
      port: 3306,
    });

    // 有効期限内のクーポンのみ取得
    const query = `
      SELECT 
        id, 
        title, 
        description, 
        DATE_FORMAT(expires_at, '%Y-%m-%d') AS expiresAt
      FROM coupons
      WHERE user_id = ? AND expires_at >= CURDATE()
      ORDER BY expires_at ASC
    `;
    const [rows] = await connection.execute(query, [userId]);
    await connection.end();

    // レスポンス
    return NextResponse.json(rows);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}