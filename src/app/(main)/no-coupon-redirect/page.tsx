'use client';

import { Box, Typography, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from '@/styles/no-coupon-redirect.module.css';

export default function NoCouponRedirect() {
  const router = useRouter();

  const handleGoToPointUsage = () => {
    router.push('/point_usage');
  };

  return (
    <Box className={styles.container}>
      <Stack spacing={4} alignItems="center">
        <Typography variant="h5" className={styles.message}>
          現在利用できる引換券はありません。
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={styles.button}
          onClick={handleGoToPointUsage}
        >
          ポイント取得はこちらから
        </Button>
      </Stack>
    </Box>
  );
}