import { NextRequest, NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

type Coupon = {
  id: string;
  title: string;
  description: string;
  discount: number;
};

type CouponRow = Coupon & RowDataPacket;

// --- ▼▼▼ ここからが変更点 ▼▼▼ ---
const pool = mysql.createPool({
    host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
    user: '2aoEqC8LhLTsFQ2.root',
    password: 'oR04mhcWgKIFx97L',
    database: 'test',
    port: 4000,
    ssl: {
        rejectUnauthorized: true,
    },
    waitForConnections: true,
    connectionLimit: 10,
});
// --- ▲▲▲ ここまでが変更点 ▲▲▲ ---

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const query = `
      SELECT 
        CAST(coupons.id AS CHAR) AS id,
        menus.menu_name AS title,
        menus.menu_contact AS description,
        menus.discount AS discount
      FROM coupons
      INNER JOIN menus ON coupons.menu_id = menus.id
      WHERE coupons.user_id = ?
      ORDER BY coupons.id ASC
    `;

    const [rows] = await pool.execute<CouponRow[]>(query, [userId]);
    return NextResponse.json(rows);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('[API ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}