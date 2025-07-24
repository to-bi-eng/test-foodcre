import { NextResponse, NextRequest } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

// データベース接続情報は環境変数から取得するのが安全です
const dbConfig = {
  host: process.env.TIDB_HOST,
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE || 'foocre_development',
  port: process.env.TIDB_PORT ? parseInt(process.env.TIDB_PORT, 10) : 4000,
  ssl: {
    rejectUnauthorized: true,
  },
};

// --- 型定義 ---
// DBから取得する問い合わせ情報の型
interface InquiryFromDB extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  status: 'pending' | 'in_progress' | 'done';
  received_at: string;
  responsed_at: string | null;
  email: string | null;
}

// PUTリクエストボディの型
interface PutBody {
  id: number;
  status: '未対応' | '対応中' | '完了';
}

// --- 補助関数 ---
const statusFromDb = (status: string): PutBody['status'] => {
  switch (status) {
    case "pending": return "未対応";
    case "in_progress": return "対応中";
    case "done": return "完了";
    default: return "未対応";
  }
};

const statusToDb = (status: PutBody['status']): InquiryFromDB['status'] => {
  switch (status) {
    case "未対応": return "pending";
    case "対応中": return "in_progress";
    case "完了": return "done";
    default: return "pending";
  }
};

// GET: 問い合わせ一覧を取得
export async function GET(_request: NextRequest) { // 'request' を使わないので '_' を付ける
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute<InquiryFromDB[]>(`
      SELECT i.id, i.title, i.content, i.status, i.received_at, i.responsed_at, u.email
      FROM inquiry i
      LEFT JOIN users u ON i.user_id = u.id
      ORDER BY i.received_at DESC
    `);

    const inquiries = rows.map(row => ({
      id: row.id,
      title: row.title,
      content: row.content,
      status: statusFromDb(row.status),
      receivedAt: new Date(row.received_at).toISOString().replace('T', ' ').slice(0, 19),
      responsedAt: row.responsed_at ? new Date(row.responsed_at).toISOString().replace('T', ' ').slice(0, 19) : '',
      email: row.email,
    }));
    return NextResponse.json({ inquiries });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

// PUT: ステータスを更新
export async function PUT(request: NextRequest) {
  let connection;
  try {
    const { id, status }: PutBody = await request.json(); // 型を適用
    connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      `UPDATE inquiry SET status = ?, responsed_at = NOW() WHERE id = ?`,
      [statusToDb(status), id]
    );
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}