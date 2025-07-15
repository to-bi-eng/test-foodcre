'use client';

import * as React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { QRCodeSVG } from 'qrcode.react';

export default function QrDisplayPage() {
  const [qrUrl, setQrUrl] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await fetch('/api/admin/qr-codes');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'QRコードの取得に失敗しました');
        }

        setQrUrl(data.url);
      } catch (err) {
        console.error('QRコード取得エラー:', err);
        setError(err instanceof Error ? err.message : 'QRコードの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchQrCode();
  }, []);

  const handleFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if ((document.documentElement as unknown as { webkitRequestFullscreen: () => void }).webkitRequestFullscreen) {
      (document.documentElement as unknown as { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
    } else if ((document.documentElement as unknown as { mozRequestFullScreen: () => void }).mozRequestFullScreen) {
      (document.documentElement as unknown as { mozRequestFullScreen: () => void }).mozRequestFullScreen();
    } else if ((document.documentElement as unknown as { msRequestFullscreen: () => void }).msRequestFullscreen) {
      (document.documentElement as unknown as { msRequestFullscreen: () => void }).msRequestFullscreen();
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1A2027',
        color: 'common.white',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >

        <Typography variant="h2" component="h1" fontWeight="bold">
          来店ポイントをGET！
        </Typography>
        <Typography variant="h5" sx={{ color: 'grey.400', maxWidth: '80%' }}>
          アプリのカメラでQRコードをスキャンしてください
        </Typography>
        
        <Box
          sx={{
            p: 3,
            bgcolor: 'white',
            borderRadius: 4,
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: { xs: 250, sm: 320 },
            minWidth: { xs: 250, sm: 320 },
          }}
        >
          {loading ? (
            <CircularProgress size={60} />
          ) : error ? (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
              エラー: {error}
            </Typography>
          ) : qrUrl ? (
            <QRCodeSVG
              value={qrUrl}
              size={Math.min(window.innerWidth * 0.6, 300)}
              level="H"
              includeMargin={true}
            />
          ) : (
            <Typography variant="h6" color="text.secondary">
              QRコードを読み込み中...
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'grey.500' }}>
          <Typography variant="body1">
            ポイントをGETできるのは1日1回のみです。
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleFullScreen}
          startIcon={<FullscreenIcon />}
          sx={{
            bgcolor: 'success.main',
            color: 'white',
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            '&:hover': {
              bgcolor: 'success.dark'
            }
          }}
        >
          全画面表示
        </Button>
      </Box>
    </Box>
  );
}