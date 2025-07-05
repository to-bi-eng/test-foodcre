import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';

// データベース接続情報を関数の外で共有
const dbConfig = {
  host: "db",
  user: "root",
  password: "password",
  database: "foocre_development",
  port: 3306,
};

// GET: クーポン・メニュー一覧を取得
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nameQuery = searchParams.get('name');

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    let sql = `SELECT id as menu_id, menu_name, point_cost, is_enabled, created_at FROM menus`;
    const params: (string | number)[] = [];

    if (nameQuery) {
      sql += ` WHERE menu_name LIKE ?`;
      params.push(`%${nameQuery}%`);
    }
    sql += ` ORDER BY menu_id ASC`;

    const [rows] = await connection.execute(sql, params);

    const menus = (rows as any[]).map(menu => ({
      menu_id: menu.menu_id,
      menu_name: menu.menu_name,
      point_cost: menu.point_cost,
      is_enabled: menu.is_enabled === 1,
      created_at: menu.created_at ? new Date(menu.created_at).toISOString().split('T')[0] : null,
    }));

    // ★ 必ず return で応答を返す
    return NextResponse.json({ menus });

  } catch (error) {
    console.error('API GET Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Internal Server Error", error: "An unknown error occurred" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

// POST: 新しいクーポン・メニューを作成
export async function POST(request: NextRequest) {
  let connection;
  try {
    const body = await request.json();
    const { menu_name, menu_contact, point_cost, is_enabled } = body;

    if (!menu_name || point_cost === undefined) {
      return NextResponse.json({ message: "Menu name and point cost are required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);
    const sql = `
      INSERT INTO menus (menu_name, menu_contact, point_cost, is_enabled, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    const params = [menu_name, menu_contact, point_cost, is_enabled ? 1 : 0];
    const [result] = await connection.execute(sql, params);
    
    const insertResult = result as mysql.ResultSetHeader;

    if (insertResult.affectedRows > 0) {
      return NextResponse.json({ message: "Menu item created successfully", menu_id: insertResult.insertId }, { status: 201 });
    } else {
      throw new Error("Failed to create the menu item.");
    }
  } catch (error) {
    console.error('API POST Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Internal Server Error", error: "An unknown error occurred" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

// DELETE: クーポン・メニューを削除
export async function DELETE(request: NextRequest) {
  let connection;
  try {
    const { menu_id } = await request.json();
    if (!menu_id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);
    const sql = `DELETE FROM menus WHERE id = ?`;
    const [result] = await connection.execute(sql, [menu_id]);
    
    const a_result = result as mysql.ResultSetHeader;
    if (a_result.affectedRows > 0) {
      return NextResponse.json({ message: "Menu item deleted successfully" });
    } else {
      return NextResponse.json({ message: "Menu item not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('API DELETE Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Internal Server Error", error: "An unknown error occurred" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

export async function PUT(request: NextRequest) {
  let connection;
  try {
    const body = await request.json();
    const { menu_id, menu_name, point_cost, is_enabled } = body;

    // ★ undefinedの可能性がある値を安全に扱うために、nullに変換する
    const menu_contact = body.menu_contact ?? null;

    // 必須項目のバリデーション
    if (!menu_id || !menu_name || point_cost === undefined) {
      return NextResponse.json({ message: "ID, Menu name and point cost are required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);

    // SQL UPDATE文を定義
    const sql = `
      UPDATE menus 
      SET menu_name = ?, menu_contact = ?, point_cost = ?, is_enabled = ?
      WHERE id = ?
    `;
    // ★ 安全に変換した値を使ってパラメータを作成
    const params = [menu_name, menu_contact, point_cost, is_enabled ? 1 : 0, menu_id];

    const [result] = await connection.execute(sql, params);
    const updateResult = result as mysql.ResultSetHeader;

    if (updateResult.affectedRows > 0) {
      return NextResponse.json({ message: "Menu item updated successfully" });
    } else {
      return NextResponse.json({ message: "Menu item not found" }, { status: 404 });
    }

  } catch (error) {
    console.error('API PUT Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Internal Server Error", error: "An unknown error occurred" }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}