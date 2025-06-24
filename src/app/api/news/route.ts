import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
    const connection = await mysql.createConnection({
        host: "db",
        user: "root",
        password: "password",
        database: "foocre_development",
        port: 3306,
    });

    const [rows] = await connection.execute('SELECT * FROM news ORDER BY created_at DESC');
    await connection.end();

    return NextResponse.json(rows);
}