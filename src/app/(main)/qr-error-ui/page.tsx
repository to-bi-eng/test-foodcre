"use client";
import { Box, Typography, Button, Stack } from '@mui/material';
import styles from '@/styles/error-screen.module.css';
import { useRouter } from 'next/navigation';

export default function ErrorScreen() {
  const router = useRouter();

  return (
    <Box>

      <Box component="main" className={styles.main}>
        <Typography className={styles.heading} variant="h4" gutterBottom>
          ポイント付与に失敗しました
        </Typography>
        <Typography className={styles.message} color="text.secondary" gutterBottom>
          再度店舗のQRコードを読み取ってください
        </Typography>
        <Button
          className={styles['back-button']}
          variant="contained"
          color="info"
          onClick={() => router.back()}
        >
          戻る
        </Button>
      </Box>
    </Box>
  );
}