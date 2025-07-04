import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  const connection = await mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'foocre_development',
    port: 3306,
  });

  const [rows] = await connection.execute(
    'SELECT id, menu_name, menu_contact, point_cost FROM menus WHERE is_enabled = 1'
  );

  const menus = (rows as any[]).map(menu => ({
    id: menu.id,
    title: menu.menu_name,
    description: menu.menu_contact ?? '',
    points: menu.point_cost ?? null,
    expiresAt: null,
    used: false,
  }));

  await connection.end();

  return NextResponse.json({ menus });
}