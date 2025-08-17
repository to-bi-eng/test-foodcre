import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

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

export async function GET() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute('SELECT * FROM news ORDER BY created_at DESC');
    
    return NextResponse.json(rows);

  } catch (error) {
    console.error('API GET News Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    // 接続が確立されていたら必ず閉じる
    if (connection) {
      await connection.end();
    }
  }
}