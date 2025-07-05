import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const resolvedParams = await context.params;
  const id = resolvedParams.id;
  const { title, content, status } = await request.json();
  const connection = await mysql.createConnection({
    host: "db",
    user: "root",
    password: "password",
    database: "foocre_development",
    port: 3306,
  });
  await connection.execute(
    'UPDATE news SET title = ?, content = ?, status = ? WHERE id = ?',
    [title, content, status, id]
  );
  await connection.end();
  return NextResponse.json({ success: true });
}