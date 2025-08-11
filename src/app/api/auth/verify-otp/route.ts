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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rows]: any = await connection.execute(
      'SELECT otp, pass, expires FROM otp_temp WHERE email = ?',
      [email]
    );

    if (!rows.length) {
      return NextResponse.json({ error: '認証コードが発行されていません。再度登録してください。' }, { status: 400 });
    }
    if (rows[0].expires < Date.now()) {
      return NextResponse.json({ error: '認証コードの有効期限が切れています。再度登録してください。' }, { status: 400 });
    }
    if (rows[0].otp !== otp) {
      return NextResponse.json({ error: '認証コードが違います。' }, { status: 400 });
    }

    // 既に登録済みかチェック
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userRows]: any = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    if (userRows.length > 0) {
      return NextResponse.json({ error: 'このメールアドレスは既に登録されています。' }, { status: 400 });
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
    return NextResponse.json({ error: '予期せぬエラーが発生しました。' }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}