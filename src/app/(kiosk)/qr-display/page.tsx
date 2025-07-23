'use client'; // スムーズなアニメーションや将来的な動的処理のために指定

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew'; // ★ 更新アイコンをインポート

export default function QrDisplayPage() {
  return (
    // ★ 画面全体のコンテナをダークテーマに
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1A2027', // ダークブルー系の背景色
        color: 'common.white', // 基本の文字色を白に
        textAlign: 'center',
      }}
    >
      {/* コンテンツ全体をまとめるBox */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4, // 各要素の間隔を広げる
        }}
      >
        {/* ★ メインのメッセージを大きく、分かりやすく */}
        <Typography variant="h2" component="h1" fontWeight="bold">
          来店ポイントをGET！
        </Typography>
        <Typography variant="h5" sx={{ color: 'grey.400', maxWidth: '80%' }}>
          アプリのカメラでQRコードをスキャンしてください
        </Typography>
        
        {/* ★ QRコード部分を大きく、目立たせる */}
        <Box
          sx={{
            p: 3, // QRコード周りの余白を広げる
            bgcolor: 'white',
            borderRadius: 4,
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* 真っ黒な四角形 (QRコードのプレースホルダー) */}
          <Box
            sx={{
              width: { xs: 250, sm: 320 }, // 画面サイズに応じて少し変える
              height: { xs: 250, sm: 320 },
              backgroundColor: 'common.black',
            }}
          />
        </Box>
        
        {/* ★ 更新通知もアイコン付きで分かりやすく */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'grey.500' }}>
          <AutorenewIcon />
          <Typography variant="body1">
            このQRコードは自動的に更新されます
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}