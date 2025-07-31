import { NextResponse, NextRequest } from 'next/server';
import mysql, { ResultSetHeader } from 'mysql2/promise';

// データベース接続情報を一元管理
const dbConfig = {
  host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
  user: '2aoEqC8LhLTsFQ2.root',
  password: 'oR04mhcWgKIFx97L',
  database: 'test',
  port: 4000,
  ssl: {
    // TiDB Cloudへの接続にはSSLが必要です
    rejectUnauthorized: true,
  },
};

export async function DELETE(request: NextRequest) {
  let connection;
  try {
    // クエリパラメータからidを取得 (NextRequestを使うとより簡単です)
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);

    const [result] = await connection.execute<ResultSetHeader>(
      'DELETE FROM news WHERE id = ?',
      [id]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "News deleted successfully" });
    } else {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('API DELETE Error:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}