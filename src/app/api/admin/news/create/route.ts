import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  const { title, content, status } = await request.json();
  const connection = await mysql.createConnection({
    host: "db",
    user: "root",
    password: "password",
    database: "foocre_development",
    port: 3306,
  });
  await connection.execute(
    'INSERT INTO news (title, content, status) VALUES (?, ?, ?)',
    [title, content, status]
  );
  await connection.end();
  return NextResponse.json({ success: true });
}