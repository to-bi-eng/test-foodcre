import mysql, { RowDataPacket } from 'mysql2/promise';

const dbConfig = {
    host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
    user: '2aoEqC8LhLTsFQ2.root',
    password: 'oR04mhcWgKIFx97L',
    database: 'test',
    port: 4000,
    ssl: {
        rejectUnauthorized: true,
    },
};

interface NewsDetail extends RowDataPacket {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

// データベースからIDを指定してニュースを取得する関数
export async function getNewsById(id: string) {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const sql = 'SELECT id, title, content, created_at FROM news WHERE id = ?';
        const [rows] = await connection.execute<NewsDetail[]>(sql, [id]);
        
        if (rows.length === 0) {
            return null; // データが見つからない場合はnullを返す
        }
        return rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch news data.'); // エラーをスローする
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}