import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    const dbConfig = {
        host: "db",
        user: "root",
        password: "password",
        database: "foocre_development",
        port: 3306,
    };

    let connection;

    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'メールアドレスとパスワードは必須です。' }, { status: 400 });
        }

        // パスワードをハッシュ化
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        connection = await mysql.createConnection(dbConfig);

        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        await connection.execute(query, [email, hashedPassword]);

        return NextResponse.json({ message: 'ユーザー登録が成功しました。' }, { status: 201 });

    } catch (error: unknown) {
        console.error(error);

        if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: string }).code === 'ER_DUP_ENTRY') {
            return NextResponse.json({ message: 'このメールアドレスは既に使用されています。' }, { status: 409 });
        }

        return NextResponse.json({ message: 'サーバーエラーが発生しました。お手数ですが、アプリ管理者への連絡をお願いします。' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}