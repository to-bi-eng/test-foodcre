import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth"; // NextAuthOptionsからNextAuthConfigに変更
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import crypto from "crypto";

type UserRow = {
  id: number;
  email: string;
  password: string;
  role?: string | null;
};

// データベース接続情報を環境変数から取得
const dbConfig = {
  host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
  user: '2aoEqC8LhLTsFQ2.root',
  password: 'oR04mhcWgKIFx97L',
  database: 'test',
  port: 4000,
};

// 毎回接続するのではなく、接続を再利用するコネクションプールに変更
const pool = mysql.createPool(dbConfig);

async function getUserByEmail(email: string): Promise<UserRow | null> {
  const [rows] = await pool.execute(
    "SELECT id, email, password, role FROM users WHERE email = ?",
    [email]
  );
  if (Array.isArray(rows) && rows.length > 0) return rows[0] as UserRow;
  return null;
}

// NextAuthOptionsからNextAuthConfigに変更
const config: NextAuthConfig = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "メールアドレス", type: "email" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(c) {
        // credentialsの型を明示
        const email = c.email as string;
        const password = c.password as string;

        if (!email || !password) return null;
        const user = await getUserByEmail(email);
        if (!user?.password) return null;
        
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;

        return { id: String(user.id), email: user.email, role: user.role ?? "user" };
      },
    }),
  ],
  callbacks: {
    // 型定義ファイルを作成するため、as any が不要になります
    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);
      if (user) { // ログイン直後
        token.userid = user.id;
        token.email = user.email;
        token.role = user.role ?? "user";
        token.iat = now;
        token.exp = now + 60 * 60; // 1h
        token.refreshToken = crypto.randomBytes(32).toString("hex");
        token.refreshTokenExpires = now + 60 * 60 * 24 * 7; // 1w
        return token;
      }
      
      // トークンリフレッシュ処理
      if (
        typeof token.exp === "number" &&
        typeof token.refreshTokenExpires === "number"
      ) {
        if (now >= token.exp && now < token.refreshTokenExpires) {
          token.iat = now;
          token.exp = now + 60 * 60;
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userid as string;
      session.user.role = token.role as string;
      session.refreshToken = token.refreshToken as string;
      session.refreshTokenExpires = token.refreshTokenExpires as number;
      return session;
    },
  },
  jwt: { maxAge: 60 * 60 },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
  },
};

export default config;