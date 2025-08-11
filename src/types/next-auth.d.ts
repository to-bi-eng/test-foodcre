import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * authorizeから返されるUserオブジェクトと、session.userの型
   */

  interface User {
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
    } & User; // email, name, imageは元々あるのでマージ
    refreshToken?: string;
    refreshTokenExpires?: number;
  }
}

/**
 * JWTコールバックのtokenの型
 */
declare module 'next-auth/jwt' {
  interface JWT {
    userid: string;
    role: string;
    refreshToken?: string;
    refreshTokenExpires?: number;
  }
}