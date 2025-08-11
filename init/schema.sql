-- メニューテーブル
CREATE TABLE menus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menu_name VARCHAR(255) NOT NULL,
    menu_contact TEXT,
    point_cost INT,
    discount INT,
    image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_enabled TINYINT(1) DEFAULT 1
);

-- ユーザーテーブル
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    reset_password VARCHAR(255),
    reset_password_send_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login_day DATETIME,
    visit_at DATETIME,
    point INT DEFAULT 0
);

-- クーポンテーブル
CREATE TABLE coupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    menu_id INT,
    used_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (menu_id) REFERENCES menus(id)
);

-- ポイント履歴テーブル
CREATE TABLE point_histories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    changed_amount INT NOT NULL,
    reason VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ニューステーブル
CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status ENUM('public', 'draft') DEFAULT 'public',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- お問い合わせテーブル
CREATE TABLE inquiry (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status ENUM('pending', 'in_progress', 'done') DEFAULT 'pending',
    received_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    responded_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- QRコードテーブル
CREATE TABLE qr_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(500) NOT NULL,
    description VARCHAR(255),
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- OTP一時保存テーブル
CREATE TABLE otp_temp (
  email VARCHAR(255) PRIMARY KEY,
  otp VARCHAR(10),
  pass VARCHAR(255),
  expires BIGINT
);