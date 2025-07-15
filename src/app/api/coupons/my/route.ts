import { NextRequest, NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

type Coupon = {
  id: string;
  title: string;
  description: string;
  expiresAt: string;
  discount: number;
};

type CouponRow = Coupon & RowDataPacket;

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

    // ...existing code...
    const query = `
      SELECT 
        CAST(coupons.id AS CHAR) AS id,
        menus.menu_name AS title,
        menus.menu_contact AS description,
        DATE_FORMAT(coupons.experied_at, '%Y-%m-%d') AS expiresAt,
        menus.discount AS discount
      FROM coupons
      INNER JOIN menus ON coupons.menu_id = menus.id
      WHERE coupons.user_id = ? AND coupons.experied_at >= CURDATE()
      ORDER BY coupons.experied_at ASC
    `;
// ...existing code...

    const [rows] = await pool.execute<CouponRow[]>(query, [userId]);
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('[API ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}