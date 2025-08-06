import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  let connection;
  try {
    const { email, otp } = await request.json();

    connection = await mysql.createConnection({
      host: 'db',
      user: 'root',
      password: 'password',
      database: 'foocre_development',
      port: 3306,
    });

    // otp_tempからデータ取得
    const [rows]: any = await connection.execute(
      'SELECT otp, pass, expires FROM otp_temp WHERE email = ?',
      [email]
    );

    if (!rows.length || rows[0].expires < Date.now() || rows[0].otp !== otp) {
      return NextResponse.json({ error: '無効なOTPです。' }, { status: 400 });
    }

    // usersテーブルに登録
    await connection.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, rows[0].pass]
    );

    // otp_tempから削除
    await connection.execute('DELETE FROM otp_temp WHERE email = ?', [email]);

    return NextResponse.json({ message: 'アカウント登録が完了しました。' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'ユーザー登録に失敗しました。' }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}