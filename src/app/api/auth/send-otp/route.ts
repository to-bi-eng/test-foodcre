import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

// OTPとハッシュ化パスワードを一時的に保存するオブジェクト（本番ではRedisやDBを推奨）
const otpStore: { [key: string]: { otp: string, pass: string, expires: number } } = {};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. 6桁のOTPを生成
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. OTPとハッシュ化パスワードを一時保存（有効期限10分）
    otpStore[email] = {
      otp: otp,
      pass: hashedPassword,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
    };

    // 4. Nodemailerでメール送信
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // .env.localファイルに設定したGmailアドレス
        pass: process.env.GMAIL_APP_PASSWORD, // .env.localファイルに設定したアプリパスワード
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'ポイントアプリ：アカウント登録の確認コード',
      text: `あなたのワンタイムパスワードは ${otp} です。このパスワードは10分間有効です。`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'OTPを送信しました。' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'メールの送信に失敗しました。' }, { status: 500 });
  }
}