import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { jwtVerify } from 'jose';

export async function GET(request: NextRequest) {
  try {
    const authorizationHeader = request.headers.get('Authorization');

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authorizationHeader.split(' ')[1];
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    if (!secret) {
      throw new Error('JWT_SECRET_KEY is not defined in environment variables.');
    }

    const { payload } = await jwtVerify(token, secret);
    const userId = payload.sub;

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const connection = await mysql.createConnection({
      host: "db",
      user: "root",
      password: "password",
      database: "foocre_development", 
      port: 3306,
    });

    const query = 'SELECT point FROM user WHERE user_id = ?';
    const [rows] = await connection.execute(query, [userId]);
    await connection.end();

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = rows[0] as { point: number };

    return NextResponse.json({ points: user.point });

  } catch (error) {
    if (error instanceof Error && (error.name === 'JWTExpired' || error.name === 'JWSInvalid' || error.name === 'JWSSignatureVerificationFailed')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}