'use client';

import React from 'react';
import styles from '@/styles/individualPointUsage.module.css';
import { Box, Typography, Button, Container } from '@mui/material';

const Page = () => {
  const validityMonths = 0;
  const userPoint = 0;
  const itemName = 'y';
  const itemAmount = 6;
  const discountPercent = 5;

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

export default Page;