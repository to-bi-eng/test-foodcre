import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
  user: '2aoEqC8LhLTsFQ2.root',
  password: 'oR04mhcWgKIFx97L',
  database: 'test',
  port: 4000,
};

// GET: クーポン・メニュー一覧を取得
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nameQuery = searchParams.get('name');

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    let sql = `SELECT id as menu_id, menu_name, discount, menu_contact, point_cost, is_enabled, created_at FROM menus`;
    const params: (string | number)[] = [];

    if (nameQuery) {
      sql += ` WHERE menu_name LIKE ?`;
      params.push(`%${nameQuery}%`);
    }
    sql += ` ORDER BY menu_id ASC`;

    const [rows] = await connection.execute(sql, params);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const menus = (rows as any[]).map(menu => ({
      menu_id: menu.menu_id,
      menu_name: menu.menu_name,
      discount: menu.discount,
      menu_contact: menu.menu_contact,
      point_cost: menu.point_cost,
      is_enabled: menu.is_enabled === 1,
      created_at: menu.created_at ? new Date(menu.created_at).toISOString().split('T')[0] : null,
    }));

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
    const { menu_name, menu_contact, discount, point_cost, is_enabled } = body;

    if (!menu_name || point_cost === undefined) {
      return NextResponse.json({ message: "Menu name and point cost are required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);
    const sql = `
      INSERT INTO menus (menu_name, menu_contact, discount, point_cost, is_enabled, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    const params = [menu_name, menu_contact, discount, point_cost, is_enabled ? 1 : 0];
    const [result] = await connection.execute(sql, params);
    
    const insertResult = result as mysql.ResultSetHeader;

    if (insertResult.affectedRows > 0) {
      // Slack通知
      if (process.env.SLACK_LOGS_WEBHOOK_URL) {
        try {
          const slackPayload = {
            text: `新しいクーポンが作成されました！\n\n*クーポン名:*\n${menu_name}\n\n*割引額:*\n${discount}円\n\n*必要ポイント:*\n${point_cost}pt`,
          };
          await fetch(process.env.SLACK_LOGS_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(slackPayload),
          });
        } catch (slackError) {
          console.error('Slackへの通知に失敗しました:', slackError);
        }
      }
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

    // Slack通知用に、削除するクーポンの名前を取得
    const [menuRows] = await connection.execute('SELECT menu_name FROM menus WHERE id = ?', [menu_id]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const menuItems = menuRows as any[];
    if (menuItems.length === 0) {
        return NextResponse.json({ message: "Menu item not found" }, { status: 404 });
    }
    const menuName = menuItems[0].menu_name;

    // 削除処理
    const sql = `DELETE FROM menus WHERE id = ?`;
    const [result] = await connection.execute(sql, [menu_id]);
    
    const a_result = result as mysql.ResultSetHeader;
    if (a_result.affectedRows > 0) {
      // Slack通知
      if (process.env.SLACK_LOGS_WEBHOOK_URL) {
        try {
            const slackPayload = {
                text: `クーポンが削除されました！\n\n*クーポン名:*\n${menuName}`,
            };
            await fetch(process.env.SLACK_LOGS_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(slackPayload),
            });
        } catch (slackError) {
            console.error('Slackへの通知に失敗しました:', slackError);
        }
      }
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

// PUT: クーポン・メニューを更新
export async function PUT(request: NextRequest) {
  let connection;
  try {
    const body = await request.json();
    const { menu_id, menu_name, discount, point_cost, is_enabled } = body;

    const menu_contact = body.menu_contact ?? null;

    if (!menu_id || !menu_name || point_cost === undefined) {
      return NextResponse.json({ message: "ID, Menu name and point cost are required" }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);

    const sql = `
      UPDATE menus 
      SET menu_name = ?, discount = ?, menu_contact = ?, point_cost = ?, is_enabled = ?
      WHERE id = ?
    `;
    const params = [menu_name, discount, menu_contact, point_cost, is_enabled ? 1 : 0, menu_id];

    const [result] = await connection.execute(sql, params);
    const updateResult = result as mysql.ResultSetHeader;

    if (updateResult.affectedRows > 0) {
      // Slack通知
      if (process.env.SLACK_LOGS_WEBHOOK_URL) {
        try {
            const slackPayload = {
                text: `クーポンが更新されました！\n\n*クーポン名:*\n${menu_name}\n\n*新しい割引額:*\n${discount}円\n\n*新しい必要ポイント:*\n${point_cost}pt`,
            };
            await fetch(process.env.SLACK_LOGS_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(slackPayload),
            });
        } catch (slackError) {
            console.error('Slackへの通知に失敗しました:', slackError);
        }
      }
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