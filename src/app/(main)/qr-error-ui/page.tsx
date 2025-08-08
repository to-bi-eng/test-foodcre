"use client";
import { Box, Typography, Button } from '@mui/material';
import styles from '@/styles/error-screen.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ErrorScreen() {
  const router = useRouter();

  return (
    <Box>
      <Box component="main" className={styles.main}>
        <Image
          src="/hachiko.png"
          alt="ハチコ"
          width={120}
          height={120}
          style={{ marginBottom: 24 }}
        />
        <Typography className={styles.heading} variant="h4" gutterBottom>
          ポイント付与に{'\n'}失敗しました
        </Typography>
        <Typography className={styles.message} color="text.secondary" gutterBottom>
          再度店舗のQRコードを読み取ってください
        </Typography>
        <Typography className={styles.message} color="error" sx={{ mt: 1 }}>
          ＊何度も失敗する場合は店員に申し出てください
        </Typography>
        <Button
          className={styles['back-button']}
          variant="contained"
          color="info"
          onClick={() => router.push('/add_point')}
        >
          戻る
        </Button>
      </Box>
    </Box>
  );
}