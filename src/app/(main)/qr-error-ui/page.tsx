"use client";
import { Box, Typography, Button, Stack } from '@mui/material';
import styles from './error-screen.module.css';
import { useRouter } from 'next/navigation';

export default function ErrorScreen() {
  const router = useRouter();

  return (
    <Box>
      <Box component="header" className={styles.header}>
        <Typography className={styles.title} fontWeight="bold" fontSize={20}>
          ポイントアプリ
        </Typography>
        <Button
          className={styles['home-button']}
          variant="contained"
          color="secondary"
          onClick={() => router.push('/')}
        >
          ホーム
        </Button>
      </Box>

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

      <Box component="footer" className={styles.footer}>
        <Typography>お問い合わせ</Typography>
        <Typography>8番ラーメン公式HP</Typography>
        <Typography>フードクリエーションHP</Typography>
        <Typography className={styles['sns-icons']}>X　Facebook　Instagram　YouTube</Typography>
        <Typography>8番らーめん公式SNS｜フードクリエーションSNS</Typography>
      </Box>
      </Box>
  );
}