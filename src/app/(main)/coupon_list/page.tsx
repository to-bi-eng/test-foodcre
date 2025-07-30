'use client';

import * as React from 'react';
import {
  Box,
  Stack,
  Typography,
  Card,
  CardActionArea,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from '@/styles/couponList.module.css';

type Coupon = {
  id: string;
  title: string;
  description: string;
  expiresAt?: string;
  discount: number;
};

export default function CouponList() {
  const [coupons, setCoupons] = React.useState<Coupon[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    fetch('/api/coupons/my?userId=123')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setCoupons(data);
          setError(null);
        } else {
          setCoupons([]);
          setError('クーポンが取得できませんでした');
        }
        setLoading(false);
      })
      .catch(() => {
        setCoupons([]);
        setError('クーポンが取得できませんでした');
        setLoading(false);
      });
  }, []);

  const handleUseCoupon = (couponId: string) => {
    router.push(`/terms_of_service?couponId=${couponId}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f7f7f7',
        }}
      >
        <CircularProgress color="primary" size={60} />
        <Typography sx={{ mt: 3, color: '#666' }} variant="h6">
          読み込み中...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.pageContainer} sx={{ minHeight: '100vh' }}>
      <Stack alignItems="center">
        <Typography variant="h5" component="h1" className={styles.mainTitle} gutterBottom>
          クーポン一覧
        </Typography>
        <Typography variant="body2" className={styles.instructions}>
          ※クーポンを押すと利用することが出来ます
          <br />
          会計時に利用するを押して店員にお見せください
          <br />
          有効期限の閉店時間まで使用することが出来ます
        </Typography>

        {error && (
          <Typography sx={{ color: 'error.main', mt: 2, mb: 2 }} variant="body1">
            {error}
          </Typography>
        )}

        <Stack spacing={2} className={styles.couponListStack}>
          {!error && coupons.length === 0 && (
            <Typography sx={{ mt: 4 }} color="text.secondary">
              クーポンはありません
            </Typography>
          )}
          {coupons.map((coupon) => (
            <Card key={coupon.id} className={styles.couponCard}>
              <CardActionArea onClick={() => handleUseCoupon(coupon.id)}>
                <Grid container>
                  {/* --- 左側7割：内容エリア --- */}
                  <Grid item xs={8} className={styles.contentArea}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ height: '100%' }}
                    >
                      {/* 画像はAPIに含まれていないのでダミー画像 */}
                      <Box className={styles.imageContainer}>
                        <Box
                          component="img"
                          src="/hachiko.png"
                          alt={coupon.title}
                          className={styles.couponImage}
                        />
                      </Box>
                      <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
                          {coupon.title}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 'bold', color: 'error.main', fontSize: '2rem' }}
                        >
                          {coupon.discount}円引き
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 1, fontSize: '1.1rem' }}>
                          {coupon.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  {/* --- 右側3割：期限エリア --- */}
                  <Grid item xs={4} className={styles.expiryArea}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption">有効期限</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {coupon.expiresAt ? coupon.expiresAt : '有効期限なし'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}