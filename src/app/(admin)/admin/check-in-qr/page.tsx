import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';

// このページは静的な表示のみなので、'use client'は不要です。
export default function CheckInQrPage() {
  return (
    <Paper
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Typography variant="h4" component="h1">
        来店ポイント用QRコード
      </Typography>
      <Typography variant="body1" color="text.secondary">
        お客様のポイントアプリでこのQRコードをスキャンしてください。
      </Typography>
      
      {/* QRコードのプレースホルダー部分 */}
      <Box
        sx={{
          p: 2,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 1,
          display: 'inline-block', // 内側のBoxを収めるため
        }}
      >
        {/* 真っ黒な四角形 */}
        <Box
          sx={{
            width: 256,
            height: 256,
            backgroundColor: 'common.black', // 黒色を指定
          }}
        />
      </Box>
      
      <Typography variant="caption" color="text.secondary">
        （このQRコードは一定時間で自動的に更新されます）
      </Typography>
    </Paper>
  );
}