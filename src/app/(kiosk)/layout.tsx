import React from 'react';

// このレイアウトは、<html>と<body>タグだけを返す、まっさらな土台です。
// これにより、このグループ内のページには他のレイアウトが一切適用されなくなります。
export default function KioskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}