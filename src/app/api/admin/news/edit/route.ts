import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// --- ▼▼▼ ここからが変更点 ▼▼▼ ---
// TiDB Cloudのデータベース接続情報
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

export async function PUT(request: Request) {
    let connection: mysql.Connection | undefined;
    try {
        // クエリパラメータからidを取得
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        const { title, content, status } = await request.json();
        
        // --- ▼▼▼ ここからが変更点 ▼▼▼ ---
        // 接続情報をTiDB Cloudのものに変更
        connection = await mysql.createConnection(dbConfig);
        // --- ▲▲▲ ここまでが変更点 ▲▲▲ ---

        const [result] = await connection.execute(
            'UPDATE news SET title = ?, content = ?, status = ? WHERE id = ?',
            [title, content, status, id]
        );

        const a_result = result as mysql.ResultSetHeader;
        if (a_result.affectedRows > 0) {
            return NextResponse.json({ message: "News updated successfully" });
        } else {
            return NextResponse.json({ message: "News not found" }, { status: 404 });
        }
    } catch (error) {
        console.error('API PUT Error:', error);
        if (error instanceof Error) {
            return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Internal Server Error", error: "An unknown error occurred" }, { status: 500 });
    } finally {
        if (connection) await connection.end();
    }
}