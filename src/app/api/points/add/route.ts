import { NextResponse } from 'next/server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
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

// 付与ポイント数
const addPoints = 1;

export async function POST(request: Request) {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    let connection;
    try {
        // --- ▼▼▼ ここからが変更点 ▼▼▼ ---
        // 接続情報をTiDB Cloudのものに変更
        connection = await mysql.createConnection(dbConfig);
        // --- ▲▲▲ ここまでが変更点 ▲▲▲ ---

        // 1.日付チェックと更新を1つのアトミックなクエリで実行
        const [updateResult] = await connection.execute<ResultSetHeader>(
            `UPDATE users
             SET
               point = point + ?,
               last_login_day = NOW()
             WHERE
               id = ? AND (DATE(last_login_day) < CURDATE() OR last_login_day IS NULL)`,
            [addPoints, userId]
        );

        // 2.更新された行数（affectedRows）を確認
        if (updateResult.affectedRows === 0) {
            // 0行しか更新されなかった場合、「既に今日ポイントが付与済み」
            const [users] = await connection.execute<RowDataPacket[]>('SELECT point FROM users WHERE id = ?', [userId]);
            if (users.length === 0) {
                return NextResponse.json({ message: 'User not found' }, { status: 404 });
            }
            const user = users[0];
            return NextResponse.json({
                message: '本日のポイント付与は終了しました',
                addPoints: 0,
                totalPoints: user.point,
            }, { status: 400 });
        }

        // 3.更新が成功した場合、最新のポイント数を取得して返す
        const [users] = await connection.execute<RowDataPacket[]>('SELECT point FROM users WHERE id = ?', [userId]);
        const user = users[0];

        return NextResponse.json({
            addPoints,
            totalPoints: user.point
        });

    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'サーバーエラーです' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}