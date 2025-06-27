import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await context.params;
  const id = resolvedParams.id;
  const connection = await mysql.createConnection({
    host: "db",
    user: "root",
    password: "password",
    database: "foocre_development",
    port: 3306,
  });

  const [rows] = await connection.execute(
    'SELECT id, menu_name, point_cost, quantity, discount FROM menus WHERE id = ?',
    [id]
  );
  await connection.end();

  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}