import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// 付与ポイント数
const add_point = 1;

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
    'SELECT point, last_login_day FROM users WHERE id = ?',
    [userId]
  );

  if (!Array.isArray(users) || users.length === 0) {
    await connection.end();
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const user = users[0] as { point: number; last_point_added: string | null };

  // 1日1回制限
  const today = new Date().toISOString().slice(0, 10);
  if (user.last_point_added && user.last_point_added.slice(0, 10) === today) {
    await connection.end();
    return NextResponse.json({
      message: 'Already added today',
      totalPoints: user.point,
    }, { status: 400 });
  }

  // ポイント加算＆最終付与日更新
  const totalPoints = user.point + add_point;
  await connection.execute(
    'UPDATE users SET points = ?, last_login_day = NOW() WHERE id = ?',
    [totalPoints, userId]
  );

  await connection.end();

  return NextResponse.json({ add_point, totalPoints });
}