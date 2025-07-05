import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const resolvedParams = await context.params;
  const id = resolvedParams.id;
  const connection = await mysql.createConnection({
    host: "db",
    user: "root",
    password: "password",
    database: "foocre_development",
    port: 3306,
  });
  await connection.execute(
    'DELETE FROM news WHERE id = ?',
    [id]
  );
  await connection.end();
  return NextResponse.json({ success: true });
}