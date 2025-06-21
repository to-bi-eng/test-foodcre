import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

type Coupon = {
  id: string;
  title: string;
  description: string;
  expiresAt: string;
};

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
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const query = `
      SELECT 
        CAST(id AS CHAR) AS id, 
        title, 
        description, 
        DATE_FORMAT(expires_at, '%Y-%m-%d') AS expiresAt
      FROM coupons
      WHERE user_id = ? AND expires_at >= CURDATE()
      ORDER BY expires_at ASC
    `;
    const [rows] = await pool.execute<Coupon[]>(query, [userId]);
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('[API ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}