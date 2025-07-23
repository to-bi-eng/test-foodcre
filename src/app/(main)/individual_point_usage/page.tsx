'use client';

import React from 'react';
import styles from '@/styles/individualPointUsage.module.css';
import {
  Box,
  Typography,
  Button,
  Container,
} from '@mui/material';

interface CouponProps {
  validityMonths?: number;
  userPoint?: number;
  itemName?: string;
  itemAmount?: number;
  discountPercent?: number;
}

const Coupon: React.FC<CouponProps> = ({
  validityMonths = 0,
  userPoint = 0,
  itemName = 'y',
  itemAmount = 6,
  discountPercent = 5,
}) => {
  return (
    <Container maxWidth="sm" className={styles.couponContainer}>
      <Box className={styles.a}>
        <Box className={styles.imageContainer}>
          <img src="/Ramen.png" alt="ラーメン画像" className={styles.couponImage} />
          <Typography className={styles.discountText}>
            {itemName}{itemAmount}個
          </Typography>

          <Typography className={styles.discountPercent} variant="inherit" component="div">
            {discountPercent}% OFF
          </Typography>
        </Box>

        <Box className={styles.infoContainer}>
          <Typography className={styles.pointExchangeText} variant='h5'>
            {userPoint}ポイントと引き換えます
          </Typography>
          <Typography className={styles.validityText} variant='h5'>
            ※有効期限は引き換えてから
          </Typography>
          <Typography className={styles.validityPeriodText} variant='h5'>
            <span className={styles.highlightedText}>
              {validityMonths}ヶ月後
            </span>です
          </Typography>
        </Box>

        <Box className={styles.buttonContainer}>
          <Button variant="contained" disableElevation className={styles.redeemButton}>
            クーポンに引き換える
          </Button>
          <Button variant="outlined" className={styles.backButton}>
            戻る
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default function IndividualPointUsagePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  const userPoint = Number(searchParams.userPoint) || 300;
  const validityMonths = Number(searchParams.validityMonths) || 1;
  const itemName = String(searchParams.itemName) || "トッピング";
  const itemAmount = Number(searchParams.itemAmount) || 1;
  const discountPercent = Number(searchParams.discountPercent) || 10;

  return (
    <Coupon
      userPoint={userPoint}
      validityMonths={validityMonths}
      itemName={itemName}
      itemAmount={itemAmount}
      discountPercent={discountPercent}
    />
  );
};