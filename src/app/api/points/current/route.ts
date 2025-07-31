import { NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

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

// DBから取得するユーザー情報の型定義
interface UserData extends RowDataPacket {
  point: number;
  email: string;
}

export async function GET() {
  let connection;
  try {
    // 認証チェックなし、id=1のユーザーのポイントとメールアドレスを返す
    const userId = 1;

    connection = await mysql.createConnection(dbConfig);

    const query = 'SELECT point, email FROM users WHERE id = ?';
    const [rows] = await connection.execute<UserData[]>(query, [userId]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = rows[0];

    return NextResponse.json({ points: user.point, email: user.email });

  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    // 接続が確立されていたら必ず閉じる
    if (connection) {
      await connection.end();
    }
  }
}