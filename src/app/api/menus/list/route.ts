import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

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

export async function GET() {
    let connection;
    try {
        // 接続情報だけをTiDB Cloudのものに変更
        connection = await mysql.createConnection(dbConfig);

        const [rows] = await connection.execute(
            'SELECT id, menu_name, menu_contact, point_cost FROM menus WHERE is_enabled = 1'
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const menus = (rows as any[]).map(menu => ({
            id: menu.id,
            title: menu.menu_name,
            description: menu.menu_contact ?? '',
            points: menu.point_cost ?? null,
            expiresAt: null,
            used: false,
        }));

        return NextResponse.json({ menus });
    } finally {
        if (connection) await connection.end();
    }
}