import NextAuth from "next-auth";
import authConfig from "./auth.config";

const authResult = NextAuth(authConfig);
export const { auth, signIn, signOut, handlers } = authResult;
export const { GET, POST } = handlers;