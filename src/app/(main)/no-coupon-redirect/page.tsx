'use client';

import { Box, Typography, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/no-coupon-redirect.module.css';

export default function NoCouponRedirect() {
  const router = useRouter();

  const handleGoToPointUsage = () => {
    router.push('/point_usage');
  };

  return (
    <Box className={styles.container}>
      {/* 画像をグレー枠の外に配置 */}
      <Image
        src="/hachiko.png"
        alt="8番らーめんキャラクター"
        width={180}
        height={140}
        style={{ marginBottom: 24 }}
      />
      <Box className={styles.box}>
        <Stack spacing={4} alignItems="center">
          <Typography
            variant="h5"
            className={styles.message}
            fontWeight="bold"
            gutterBottom
            style={{ whiteSpace: 'pre-line' }}
          >
            ポイントを交換して{'\n'}お得なクーポンをゲットしよう！
          </Typography>
          <Typography
            variant="h6"
            className={styles.message}
          >
            現在ご利用いただける
            {'\n'}
            引換券はありません。
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={styles.button}
            onClick={handleGoToPointUsage}
          >
            ポイント交換
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}