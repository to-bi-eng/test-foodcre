'use client';

import React from 'react';
import styles from '@/styles/Individual_Point_Usage.module.css';
import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

interface CouponProps {
  point_cost: number;
  menu_name: string;
  quantity: number;
  discount: number;
}

export default function Coupon({ point_cost, menu_name, quantity, discount }: CouponProps) {
  return (
    <Container maxWidth="sm" className={styles.couponContainer}>
      <Box>
        <Box className={styles.imageContainer}>
          <Image src="/Ramen.png"
            alt="ラーメン画像"
            width={300}           // 画像の実際の幅や希望サイズを指定
            height={200}          // 画像の実際の高さや希望サイズを指定
            style={{ width: '100%', height: 'auto' }} />
          <Typography className={styles.discountText}>
            {menu_name}{quantity}個
          </Typography>

          <Typography className={styles.discountText} variant="inherit" component="div">
            {discount}% OFF
          </Typography>
        </Box>

        <Box className={styles.infoContainer}>
          <Typography className={styles.attention} variant='h6'>
            {point_cost}ポイントと引き換えます
          </Typography>
        </Box>
        <Box className={styles.buttonContainer}>
          <Link href="/points_to_coupons" passHref>
            <Button variant="contained" disableElevation className={styles.redeemButton}>
              クーポンに引き換える
            </Button>
          </Link>
          <Link href="/points_to_coupons" passHref>
          <Button variant="outlined" className={styles.backButton}>
            戻る
          </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};