import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "db",
  user: "root",
  password: "password",
  database: "foocre_development",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(request: Request) {
  const { userId, couponId } = await request.json();
  const connection = await pool.getConnection();

  try {
    // クーポンの必要ポイントを取得
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [couponRows]: any = await connection.execute(
      'SELECT point_cost FROM menus WHERE id = ?',
      [couponId]
    );
    if (!Array.isArray(couponRows) || couponRows.length === 0) {
      return NextResponse.json({ message: "クーポンが存在しません" }, { status: 404 });
    }
    const pointCost = couponRows[0].point_cost;

    // ユーザーの現在ポイントを取得
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userRows]: any = await connection.execute(
      'SELECT point FROM users WHERE id = ?',
      [userId]
    );
    if (!Array.isArray(userRows) || userRows.length === 0) {
      return NextResponse.json({ message: "ユーザーが存在しません" }, { status: 404 });
    }
    const currentPoints = userRows[0].point;

    // ポイント不足チェック
    if (currentPoints < pointCost) {
      return NextResponse.json({ message: "所持ポイントが足りません" }, { status: 400 });
    }

    // トランザクション開始
    await connection.beginTransaction();
    try {
      // ポイント減算
      await connection.execute(
        'UPDATE users SET point = point - ? WHERE id = ?',
        [pointCost, userId]
      );
      // クーポン付与
      await connection.execute(
        'INSERT INTO coupons (user_id, menu_id) VALUES (?, ?)',
        [userId, couponId]
      );
      // コミット
      await connection.commit();

      // 残ポイント取得
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [updatedUserRows]: any = await connection.execute(
        'SELECT point FROM users WHERE id = ?',
        [userId]
      );
      const remainingPoints = updatedUserRows[0].point;

      return NextResponse.json({
        message: "ポイントと交換しました",
        remainingPoints
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      await connection.rollback();
      return NextResponse.json({ message: "交換処理に失敗しました" }, { status: 500 });
    }
  } finally {
    connection.release();
  }
}