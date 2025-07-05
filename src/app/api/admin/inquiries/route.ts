import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: "db",
  user: "root",
  password: "password",
  database: "foocre_development",
  port: 3306,
};

// GET: お問い合わせ一覧、または詳細を取得
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    if (id) {
      // IDが指定されている場合は、1件だけ取得
      const sql = `SELECT * FROM inquiries WHERE id = ?`;
      const [rows] = await connection.execute(sql, [id]);
      const inquiry = (rows as any[])[0] || null;
      return NextResponse.json({ inquiry });
    } else {
      // IDが指定されていない場合は、全件取得
      const sql = `SELECT id, user_name, user_email, subject, status, received_at FROM inquiries ORDER BY received_at DESC`;
      const [rows] = await connection.execute(sql);
      const inquiries = (rows as any[]).map(row => ({
        ...row,
        received_at: row.received_at ? new Date(row.received_at).toISOString().slice(0, 19).replace('T', ' ') : null,
      }));
      return NextResponse.json({ inquiries });
    }
  } catch (error) {
    console.error('API GET Inquiries Error:', error);
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

// PUT: お問い合わせのステータスを更新
export async function PUT(request: NextRequest) {
  let connection;
  try {
    const { inquiryId, status } = await request.json();

    if (!inquiryId || !status) {
      return NextResponse.json({ message: "Inquiry ID and status are required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);
    const sql = `UPDATE inquiries SET status = ? WHERE id = ?`;
    await connection.execute(sql, [status, inquiryId]);

    return NextResponse.json({ message: "Status updated successfully" });

  } catch (error) {
    console.error('API PUT Inquiry Error:', error);
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}