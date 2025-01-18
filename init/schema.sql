-- メニューテーブル
CREATE TABLE menu (
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    menu_name VARCHAR(255) NOT NULL,
    menu_contact TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    point_cost INT,
    is_enabled BOOLEAN DEFAULT TRUE
);

-- クーポンテーブル
CREATE TABLE coupon (
    coupon_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    menu_id INT,
    used_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_of_expiry DATETIME,
    FOREIGN KEY (menu_id) REFERENCES menu(menu_id)
);

-- ユーザーテーブル
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rst_pwd VARCHAR(255),
    rst_pwd_send_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login_day DATETIME,
    visit_at DATETIME,
    point INT DEFAULT 0,
    coupon_id INT,
    FOREIGN KEY (coupon_id) REFERENCES coupon(coupon_id)
);

-- ポイント履歴テーブル
CREATE TABLE point_histories (
    point_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    changed_amount INT NOT NULL,
    reason VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- ニューステーブル
CREATE TABLE news (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
