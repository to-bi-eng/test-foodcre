import { NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

// --- ▼▼▼ ここからが変更点 ▼▼▼ ---
// データベース接続情報を固定値に変更
const dbConfig = {
    host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
    user: '2aoEqC8LhLTsFQ2.root',
    password: 'oR04mhcWgKIFx97L',
    database: 'test',
    port: 4000,
    ssl: {
        rejectUnauthorized: true,
    },
};
// --- ▲▲▲ ここまでが変更点 ▲▲▲ ---

// 取得するニュースデータの型を定義します
interface NewsItem extends RowDataPacket {
    id: number;
    title: string;
    content: string;
    status: 'public' | 'draft';
    created_at: string;
    updated_at: string;
}

export async function GET() {
    let connection;
    try {
        // データベースに接続します
        connection = await mysql.createConnection(dbConfig);

        // データを取得するSQLクエリを実行します
        const sql = "SELECT * FROM news WHERE status = 'public' ORDER BY created_at DESC";
        const [rows] = await connection.execute<NewsItem[]>(sql);

        // 取得したデータをJSON形式で返却します
        return NextResponse.json(rows);

    } catch (error) {
        // エラーハンドリング
        console.error('API Error:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        
    } finally {
        // 処理が成功しても失敗しても、必ず接続を閉じます
        if (connection) {
            await connection.end();
        }
    }
}