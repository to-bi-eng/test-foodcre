import { NextResponse, NextRequest } from 'next/server';
import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

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
// DBから取得するユーザーの型
interface UserFromDB extends RowDataPacket {
  id: number;
  email: string;
  point: number | null;
  last_login_day: string | null;
  visit_at: string | null;
  created_at: string | null;
}

// PUTリクエストボディの型
interface PutBody {
  id: number;
  point: number;
}

// DELETEリクエストボディの型
interface DeleteBody {
  id: number;
}

// GET: ユーザー一覧を取得
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const emailQuery = searchParams.get('email');
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    let sql = `SELECT id, email, point, last_login_day, visit_at, created_at FROM users`;
    const params: string[] = [];

    if (emailQuery) {
      sql += ` WHERE email LIKE ?`;
      params.push(`%${emailQuery}%`);
    }
    sql += ` ORDER BY id ASC`;

    const [rows] = await connection.execute<UserFromDB[]>(sql, params);

    const users = rows.map(user => ({
      id: user.id,
      email: user.email,
      point: user.point ?? 0,
      last_login_day: user.last_login_day ? new Date(user.last_login_day).toISOString().slice(0, 19).replace('T', ' ') : null,
      visit_at: user.visit_at ? new Date(user.visit_at).toISOString().slice(0, 19).replace('T', ' ') : null,
      created_at: user.created_at ? new Date(user.created_at).toISOString().slice(0, 19).replace('T', ' ') : null,
    }));

    return NextResponse.json({ users });
  } catch (error) {
    console.error('API GET Users Error:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

// PUT: ユーザーのポイント情報を更新
export async function PUT(request: NextRequest) {
  let connection;
  try {
    const { id, point }: PutBody = await request.json();

    if (id === undefined || point === undefined) {
      return NextResponse.json({ message: "User ID and point are required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);
    const sql = `UPDATE users SET point = ? WHERE id = ?`;
    const [result] = await connection.execute<ResultSetHeader>(sql, [point, id]);

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "User updated successfully" });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('API PUT User Error:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

// DELETE: ユーザーを削除
export async function DELETE(request: NextRequest) {
  let connection;
  try {
    const { id }: DeleteBody = await request.json();

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);
    const sql = `DELETE FROM users WHERE id = ?`;
    const [result] = await connection.execute<ResultSetHeader>(sql, [id]);
    
    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "User deleted successfully" });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('API DELETE User Error:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}