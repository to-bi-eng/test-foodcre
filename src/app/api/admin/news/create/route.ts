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

export async function POST(request: Request) {
  let connection;
  try {
    const { title, content, status } = await request.json();

    // 簡単なバリデーション
    if (!title || !content || !status) {
      return NextResponse.json({ message: 'Title, content, and status are required' }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);
    
    await connection.execute(
      'INSERT INTO news (title, content, status) VALUES (?, ?, ?)',
      [title, content, status]
    );

    // 成功した場合、201 Createdを返すのが一般的です
    return NextResponse.json({ message: 'News created successfully' }, { status: 201 });

  } catch (error) {
    console.error('API POST Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    // 接続が確立されていたら必ず閉じる
    if (connection) {
      await connection.end();
    }
  }
}