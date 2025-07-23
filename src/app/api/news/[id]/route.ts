import { NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

// データベース接続情報は環境変数から取得します
const dbConfig = {
  host: process.env.TIDB_HOST,
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  port: process.env.TIDB_PORT ? parseInt(process.env.TIDB_PORT, 10) : 4000,
  ssl: {
    rejectUnauthorized: true,
  },
};

// 取得するニュース詳細データの型を定義します
interface NewsDetail extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

// Next.js App Routerの正しい引数の型を使用します
export async function GET(
  _request: Request, // requestは使わないので '_' を付けます
  context: { params: { id: string } }
) {
  const id = context.params.id;
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const sql = 'SELECT id, title, content, created_at FROM news WHERE id = ?';
    const [rows] = await connection.execute<NewsDetail[]>(sql, [id]);

    // データが見つからなかった場合は404エラーを返します
    if (rows.length === 0) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    // 取得したデータを返します
    return NextResponse.json(rows[0]);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });

  } finally {
    if (connection) {
      await connection.end();
    }
  }
}