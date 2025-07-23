import { NextResponse, NextRequest } from 'next/server';
import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

// データベース接続情報は環境変数から取得するのが安全です
const dbConfig = {
  host: process.env.TIDB_HOST,
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE || 'foocre_development',
  port: process.env.TIDB_PORT ? parseInt(process.env.TIDB_PORT, 10) : 4000,
  ssl: {
    // TiDB Cloudなど、多くのクラウドDBではSSL接続が必須です
    rejectUnauthorized: true,
  },
};

// --- 型定義 ---
// DBから取得するメニューの型
interface MenuFromDB extends RowDataPacket {
  menu_id: number;
  menu_name: string;
  menu_contact: string | null;
  point_cost: number;
  is_enabled: 0 | 1;
  created_at: string;
}

// POSTリクエストボディの型
interface PostBody {
  menu_name: string;
  menu_contact?: string | null;
  point_cost: number;
  is_enabled?: boolean;
}

// PUTリクエストボディの型
interface PutBody extends PostBody {
  menu_id: number;
}

// DELETEリクエストボディの型
interface DeleteBody {
  menu_id: number;
}

// GET: クーポン・メニュー一覧を取得
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nameQuery = searchParams.get('name');
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    let sql = `SELECT id as menu_id, menu_name, menu_contact, point_cost, is_enabled, created_at FROM menus`;
    const params: (string | number)[] = [];

    if (nameQuery) {
      sql += ` WHERE menu_name LIKE ?`;
      params.push(`%${nameQuery}%`);
    }
    sql += ` ORDER BY menu_id ASC`;

    const [rows] = await connection.execute<MenuFromDB[]>(sql, params);

    const menus = rows.map(menu => ({
      menu_id: menu.menu_id,
      menu_name: menu.menu_name,
      menu_contact: menu.menu_contact,
      point_cost: menu.point_cost,
      is_enabled: menu.is_enabled === 1,
      created_at: menu.created_at ? new Date(menu.created_at).toISOString().split('T')[0] : null,
    }));

    return NextResponse.json({ menus });
  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

// POST: 新しいクーポン・メニューを作成
export async function POST(request: NextRequest) {
  let connection;
  try {
    const body: PostBody = await request.json();
    const { menu_name, menu_contact, point_cost, is_enabled } = body;

    if (!menu_name || point_cost === undefined) {
      return NextResponse.json({ message: "Menu name and point cost are required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);
    const sql = `
      INSERT INTO menus (menu_name, menu_contact, point_cost, is_enabled, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    const params = [menu_name, menu_contact ?? null, point_cost, is_enabled ? 1 : 0];
    const [result] = await connection.execute<ResultSetHeader>(sql, params);
    
    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "Menu item created successfully", menu_id: result.insertId }, { status: 201 });
    } else {
      throw new Error("Failed to create the menu item.");
    }
  } catch (error) {
    console.error('API POST Error:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

// DELETE: クーポン・メニューを削除
export async function DELETE(request: NextRequest) {
  let connection;
  try {
    const { menu_id }: DeleteBody = await request.json();
    if (!menu_id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);
    const sql = `DELETE FROM menus WHERE id = ?`;
    const [result] = await connection.execute<ResultSetHeader>(sql, [menu_id]);
    
    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "Menu item deleted successfully" });
    } else {
      return NextResponse.json({ message: "Menu item not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('API DELETE Error:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

// PUT: クーポン・メニューを更新
export async function PUT(request: NextRequest) {
  let connection;
  try {
    const body: PutBody = await request.json();
    const { menu_id, menu_name, point_cost, is_enabled } = body;
    const menu_contact = body.menu_contact ?? null;

    if (!menu_id || !menu_name || point_cost === undefined) {
      return NextResponse.json({ message: "ID, Menu name and point cost are required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);
    const sql = `
      UPDATE menus 
      SET menu_name = ?, menu_contact = ?, point_cost = ?, is_enabled = ?
      WHERE id = ?
    `;
    const params = [menu_name, menu_contact, point_cost, is_enabled ? 1 : 0, menu_id];
    const [result] = await connection.execute<ResultSetHeader>(sql, params);

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "Menu item updated successfully" });
    } else {
      return NextResponse.json({ message: "Menu item not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('API PUT Error:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}