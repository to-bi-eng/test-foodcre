import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const otpStore: { [key: string]: { otp: string, pass: string, expires: number } } = {};

export async function POST(request: Request) {
  let connection;
  try {
    const { email, otp } = await request.json();

    const storedData = otpStore[email];

    if (!storedData || storedData.expires < Date.now() || storedData.otp !== otp) {
      return NextResponse.json({ error: '無効なOTPです。' }, { status: 400 });
    }

    connection = await mysql.createConnection({
      host: 'db',
      user: 'root',
      password: 'password',
      database: 'foocre_development',
      port: 3306,
    });

    await connection.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, storedData.pass]
    );

    console.log(`User created: ${email}`);

    delete otpStore[email];

    return NextResponse.json({ message: 'アカウント登録が完了しました。' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'ユーザー登録に失敗しました。' }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}