import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null | undefined;
      role: string;
    } & DefaultSession["user"];
    iat: number;
    exp: number;
    refreshToken: string;
    refreshTokenExpires: number;
  }
  interface User {
    id: string;
    role: string;
  }
}