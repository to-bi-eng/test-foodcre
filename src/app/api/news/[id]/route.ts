import { NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

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

interface NewsDetail extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export async function GET(
  req: Request,
  // eslint-disable-next-line
  context: any  // ← 型チェックを避けるために any にする
) {
  const id = context.params.id;
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const sql = 'SELECT id, title, content, created_at FROM news WHERE id = ?';
    const [rows] = await connection.execute<NewsDetail[]>(sql, [id]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

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
