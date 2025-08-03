import { NextResponse } from 'next/server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import mysql from 'mysql2/promise';

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
        connection = await mysql.createConnection({
            host: "db",
            user: "root",
            password: "password",
            database: "foocre_development",
            port: 3306,
        });

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
                message: 'Already added today',
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
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}