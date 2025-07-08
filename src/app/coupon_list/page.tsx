'use client';

import * as React from 'react';
import {
  Box,
  Stack,
  Typography,
  Card,
  CardActionArea,
  Grid,
} from '@mui/material';
import styles from './../../styles/couponList.module.css';
// クーポンデータ
const couponData = [
  {
    id: 1,
    name: '餃子6個',
    offer: '5%off',
    condition: '*本券1枚につき1個限り',
    image: '/hachiko.png',
    expiry: '2024.01.01',
  },
  {
    id: 2,
    name: 'ミニチャーハン',
    offer: '無料',
    condition: '*ラーメン1杯注文につき1皿限り',
    image: '/hachiko.png',
    expiry: '2024.01.01',
  },
  {
    id: 3,
    name: 'チャーハン',
    offer: '50円引き',
    condition: '*一回利用につき1皿限り',
    image: '/hachiko.png',
    expiry: '2024.01.01',
  },
];

export default function CouponList() {
  const handleUseCoupon = (couponName: string) => {
    alert(`${couponName} のクーポンを利用します`);
  };

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

        {/* クーポンリスト */}
        <Stack spacing={2} className={styles.couponListStack}>
          {couponData.map((coupon) => (
            <Card key={coupon.id} className={styles.couponCard}>
              <CardActionArea onClick={() => handleUseCoupon(coupon.name)}>
                {/* ↓↓↓ レイアウト構造を全面的に変更 ↓↓↓ */}
                <Grid container>
                  {/* --- 左側7割：内容エリア --- */}
                  <Grid item xs={8} className={styles.contentArea}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ height: '100%' }}
                    >
                      <Box className={styles.imageContainer}>
                        <Box
                          component="img"
                          src={coupon.image}
                          alt={coupon.name}
                          className={styles.couponImage}
                        />
                      </Box>
                      <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {coupon.name}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 'bold', color: 'error.main' }}
                        >
                          {coupon.offer}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                          {coupon.condition}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  {/* --- 右側3割：期限エリア --- */}
                  <Grid item xs={4} className={styles.expiryArea}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption">有効期限</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {coupon.expiry}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                {/* ↑↑↑ レイアウト構造を全面的に変更 ↑↑↑ */}
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
