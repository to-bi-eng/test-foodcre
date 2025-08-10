import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: "db",
  user: "root",
  password: "password",
  database: "foocre_development",
  port: 3306,
};

const statusFromDb = (status: string) => {
  switch (status) {
    case "pending": return "未対応";
    case "in_progress": return "対応中";
    case "done": return "完了";
    default: return status;
  }
};

const statusToDb = (status: string) => {
  switch (status) {
    case "未対応": return "pending";
    case "対応中": return "in_progress";
    case "完了": return "done";
    default: return "pending";
  }
};

export async function GET(request: NextRequest) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(`
      SELECT id, name, email, title, content, status, received_at, responded_at
      FROM inquiry
      ORDER BY received_at DESC
    `);
    
    const inquiries = (rows as any[]).map(row => ({
      id: row.id,
      name: row.name, 
      email: row.email, 
      title: row.title,
      content: row.content,
      status: statusFromDb(row.status),
      receivedAt: row.received_at ? new Date(row.received_at).toISOString().replace('T', ' ').slice(0, 19) : '',
      respondedAt: row.responded_at ? new Date(row.responded_at).toISOString().replace('T', ' ').slice(0, 19) : '',
    }));
    
    return NextResponse.json({ inquiries });

  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

export async function PUT(request: NextRequest) {
  let connection;
  try {
    const { id, status } = await request.json();
    connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      `UPDATE inquiry SET status = ? WHERE id = ?`,
      [statusToDb(status), id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}