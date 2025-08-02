import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: "db",
  user: "root",
  password: "password",
  database: "foocre_development",
  port: 3306,
};

export async function GET() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const sql = `SELECT url FROM qr_codes ORDER BY RAND() LIMIT 1`;
    const [rows] = await connection.execute(sql);

    if ((rows as mysql.RowDataPacket[]).length === 0) {
      return NextResponse.json(
        { error: 'QRコードが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      url: (rows as mysql.RowDataPacket[])[0].url
    });

  } catch (error) {
    console.error('QRコード取得エラー:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'QRコードの取得に失敗しました', message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'QRコードの取得に失敗しました' },
      { status: 500 }
    );
  } finally {
    if (connection) await connection.end();
  }
} 