import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import crypto from "crypto";

type UserRow = {
  id: number;
  email: string;
  password: string;
  role?: string | null;
};

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
};

async function getUserByEmail(email: string): Promise<UserRow | null> {
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute(
    "SELECT id, email, password, role FROM users WHERE email = ?",
    [email]
  );
  await conn.end();
  if (Array.isArray(rows) && rows.length > 0) return rows[0] as UserRow;
  return null;
}

const config: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "メールアドレス", type: "email" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(c) {
        const email = c?.email;
        const password = c?.password;
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
    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);
      if (user) {
        token.userid = (user as any).id;
        token.email = (user as any).email;
        token.role = (user as any).role ?? "user";
        token.iat = now;
        token.exp = now + 60 * 60; // 1h
        token.refreshToken = crypto.randomBytes(32).toString("hex");
        token.refreshTokenExpires = now + 60 * 60 * 24 * 7; // 1w
        return token;
      }
      // 簡易リフレッシュ
      if (
        typeof token.exp === "number" &&
        typeof token.refreshTokenExpires === "number"
      ) {
        const nowSec = now;
        if (nowSec >= token.exp && nowSec < token.refreshTokenExpires) {
          token.iat = nowSec;
            token.exp = nowSec + 60 * 60;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.userid as string,
        email: token.email as string | null | undefined,
        role: (token.role as string) || "user",
      };
      session.iat = token.iat as number;
      session.exp = token.exp as number;
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