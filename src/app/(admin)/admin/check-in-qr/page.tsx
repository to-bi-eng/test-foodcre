'use client';

import * as React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

export default function CheckInQrPage() {
  
  const handleStartDisplay = () => {
    window.open('/qr-display', '_blank');
  };

  return (
    <Paper
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2,
      }}
    >
      <QrCodeScannerIcon sx={{ fontSize: 60, color: 'primary.main' }} />
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        来店ポイントQRコード表示
      </Typography>
      <Box sx={{ maxWidth: '600px', textAlign: 'left', mb: 3 }}>
        {/* ★ ここからが修正箇所です ★ */}
        <Typography variant="body1" component="p" sx={{ mb: 2 }}>
          このページは、お客様に来店ポイントを付与するためのQRコードを、新しいタブで表示します。
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 2 }}>
          下の「表示を開始」ボタンを押すと、新しいタブが開き、QRコードが表示されます。そのタブを、お客様が見やすい場所に設置したタブレット端末で全画面表示にしてください。
        </Typography>
        {/* ★ ここまでが修正箇所です ★ */}
        <Typography variant="body2" color="text.secondary">
          <strong>注意：</strong>一度表示を開始すると、このページを閉じるまでQRコードが表示され続けます。終了する際はブラウザのタブを閉じてください。
        </Typography>
      </Box>
      <Button
        variant="contained"
        size="large"
        onClick={handleStartDisplay}
        sx={{ minWidth: 250, p: 2, fontSize: '1.2rem' }}
      >
        表示を開始
      </Button>
    </Paper>
  );
}