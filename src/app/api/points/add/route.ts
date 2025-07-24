import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// 付与ポイント数
const addPoints = 1;

export async function POST(request: Request) {
  const body = await request.json();
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  const connection = await mysql.createConnection({
    host: "db",
    user: "root",
    password: "password",
    database: "foocre_development",
    port: 3306,
  });

  // ユーザー情報取得
  const [users] = await connection.execute(
    'SELECT point, last_login_day FROM users WHERE id = ? FOR UPDATE',
    [userId]
  );

  await connection.commit();

  if (!Array.isArray(users) || users.length === 0) {
    await connection.end();
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const user = users[0] as { point: number; last_login_day: Date | string | null };

  // 1日1回制限
  const nowJST = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const today = nowJST.toISOString().slice(0, 10);
  let lastLoginDayStr: string | null = null;
  if (user.last_login_day instanceof Date) {
    lastLoginDayStr = user.last_login_day.toISOString().slice(0, 10);
  }
  
  if (lastLoginDayStr && lastLoginDayStr === today) {
    await connection.end();
    return NextResponse.json({
      message: 'Already added today',
       addPoints: 0,
      totalPoints: user.point,
    }, { status: 400 });
  }

  // ポイント加算＆最終付与日更新
  const totalPoints = user.point + addPoints;
  await connection.execute(
    "UPDATE users SET point = ?, last_login_day = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE id = ?",
    [totalPoints, userId]
  );

  await connection.end();

  return NextResponse.json({ addPoints, totalPoints });
}