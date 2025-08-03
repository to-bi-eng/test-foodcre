import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const dbConfig = {
  host: "db",
  user: "root",
  password: "password",
  database: "foocre_development",
  port: 3306,
};

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const connection = await mysql.createConnection(dbConfig);
        const [rows]: any = await connection.execute(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        );
        await connection.end();

        if (!rows.length) return null;
        const user = rows[0];
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      // 初回サインイン時
      if (user) {
        token.userid = user.id;
        token.email = user.email;
        token.role = user.role;
        token.iat = Math.floor(Date.now() / 1000);
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
        // リフレッシュトークン生成
        token.refreshToken = randomBytes(32).toString("hex");
        token.refreshTokenExpires = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
      }
      return token;
    },
    async session({ session, token }) {
      session.userid = token.userid;
      session.email = token.email;
      session.role = token.role;
      session.iat = token.iat;
      session.exp = token.exp;
      session.refreshToken = token.refreshToken;
      session.refreshTokenExpires = token.refreshTokenExpires;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };