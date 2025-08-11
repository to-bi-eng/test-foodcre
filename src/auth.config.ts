import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import crypto from "crypto";

type UserRow = {
  id: number;
  email: string;
  password: string;
  role?: string | null;
};

// --- ▼▼▼ 改善点2 ▼▼▼ ---
const dbConfig = { /* ... */ };
const pool = mysql.createPool(dbConfig);

async function getUserByEmail(email: string): Promise<UserRow | null> {
  const [rows] = await pool.execute(
    "SELECT id, email, password, role FROM users WHERE email = ?",
    [email]
  );
  if (Array.isArray(rows) && rows.length > 0) return rows[0] as UserRow;
  return null;
}
// --- ▲▲▲ 改善点2 ▲▲▲ ---

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
        const email = c?.email as string;
        const password = c?.password as string;

        if (!email || !password) return null;
        const user = await getUserByEmail(email);
        if (!user?.password) return null;
        
        // --- ▼▼▼ 改善点1 (エラー修正) ▼▼▼ ---
        const ok = await bcrypt.compare(password, user.password);
        // --- ▲▲▲ 改善点1 (エラー修正) ▲▲▲ ---
        
        if (!ok) return null;
        return { id: String(user.id), email: user.email, role: user.role ?? "user" };
      },
    }),
  ],
  callbacks: {
    // --- ▼▼▼ 改善点1 (型定義により 'as any' などが不要に) ▼▼▼ ---
    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);
      if (user) { // ログイン直後
        token.userid = user.id ?? '';
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
        const nowSec = Math.floor(Date.now() / 1000);
        if (nowSec >= token.exp && nowSec < token.refreshTokenExpires) {
          token.iat = nowSec;
          token.exp = nowSec + 60 * 60; // 1h
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userid;
      session.user.role = token.role;
      session.refreshToken = token.refreshToken;
      session.refreshTokenExpires = token.refreshTokenExpires;
      return session;
    },
    // --- ▲▲▲ 改善点1 ▲▲▲ ---
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