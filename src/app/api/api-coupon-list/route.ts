import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Coupon の型を定義
type Coupon = {
  id: number;
  title: string;
  description: string;
  expiresAt: string;
};

// MySQL接続プール（再接続を避ける）
const pool = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'foocre_development',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

export async function GET(req: NextRequest) {
  try {
    // クエリパラメータから userId を取得
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    // userId の存在チェックと数値チェック
    if (!userId || isNaN(Number(userId))) {
      return NextResponse.json(
        { error: 'Valid numeric userId is required' },
        { status: 400 }
      );
    }

    // クーポンデータを取得（有効期限が今日以降）
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

    const [rows] = await pool.execute<Coupon[]>(query, [userId]);

    return NextResponse.json(rows, {
      headers: {
        'Access-Control-Allow-Origin': '*', // 必要に応じて制限可能
      },
    });
  } catch (error: any) {
    console.error('[API ERROR]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
