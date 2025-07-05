import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function DELETE(request: Request) {
  let connection;
  try {
    // クエリパラメータからidを取得
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    connection = await mysql.createConnection({
      host: "db",
      user: "root",
      password: "password",
      database: "foocre_development",
      port: 3306,
    });

    const [result] = await connection.execute(
      'DELETE FROM news WHERE id = ?',
      [id]
    );

    const a_result = result as mysql.ResultSetHeader;
    if (a_result.affectedRows > 0) {
      return NextResponse.json({ message: "News deleted successfully" });
    } else {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('API DELETE Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Internal Server Error", error: "An unknown error occurred" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}