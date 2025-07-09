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
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute(`
    SELECT i.id, i.title, i.content, i.status, i.received_at, i.responsed_at, u.email
    FROM inquiry i
    LEFT JOIN users u ON i.user_id = u.id
    ORDER BY i.received_at DESC
  `);
  await connection.end();

  const inquiries = (rows as any[]).map(row => ({
    id: row.id,
    title: row.title,
    content: row.content,
    status: statusFromDb(row.status),
    receivedAt: row.received_at ? new Date(row.received_at).toISOString().replace('T', ' ').slice(0, 19) : '',
    responsedAt: row.responsed_at ? new Date(row.responsed_at).toISOString().replace('T', ' ').slice(0, 19) : '',
    email: row.email,
  }));
  return NextResponse.json({ inquiries });
}

export async function PUT(request: NextRequest) {
  const { id, status } = await request.json();
  const connection = await mysql.createConnection(dbConfig);
  await connection.execute(
    `UPDATE inquiry SET status = ? WHERE id = ?`,
    [statusToDb(status), id]
  );
  await connection.end();
  return NextResponse.json({ success: true });
}

