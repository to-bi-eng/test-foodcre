import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// --- ▼▼▼ ここからが変更点 ▼▼▼ ---
// 提示されたTiDB Cloudのデータベース接続情報
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

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    let connection;
    try {
        const resolvedParams = await context.params;
        const id = resolvedParams.id;

        // --- ▼▼▼ ここからが変更点 ▼▼▼ ---
        // 接続情報をdbConfigに変更
        connection = await mysql.createConnection(dbConfig);
        // --- ▲▲▲ ここまでが変更点 ▲▲▲ ---

        const [rows] = await connection.execute(
            'SELECT id, menu_name, point_cost, discount FROM menus WHERE id = ?',
            [id]
        );

        if (!Array.isArray(rows) || rows.length === 0) {
            return NextResponse.json(null, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        // エラーハンドリングを追加するとより堅牢になります
        console.error("API Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        if (connection) await connection.end();
    }
}