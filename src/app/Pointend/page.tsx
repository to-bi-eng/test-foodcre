'use client'
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styles from '../../styles/Pointend.module.css';

interface PointAppProps {
  earnedPoints: number;
  totalPoints: number;
}

const PointApp: React.FC<PointAppProps> = ({ earnedPoints, totalPoints }) => {
  return (
    <Box className={styles.container}>
      {/* ポイント付与メッセージ */}
      <Box className={styles.awardedPointsContainer}>
        <Typography variant="h5" component="h1" className={styles.awardedPointsText}>
          {earnedPoints}ポイント付与
          <br />
          されました！
        </Typography>
      </Box>

      {/* 現在の所有ポイント表示 */}
      <Box className={styles.totalPointsContainer}>
        <Typography variant="body1" className={styles.totalPointsText}>
          現在の所有ポイント：
          <br />
          {totalPoints}ポイント
        </Typography>
      </Box>

      {/* メッセージ */}
      <Box className={styles.exchangeMessageContainer}>
        <Typography variant="body1" className={styles.exchangeMessageText}>
          getしたポイントを交換して
          <br />
          クーポンを手に入れよう！！
        </Typography>
      </Box>

      {/* ポイント交換ボタン */}
      <Box className={styles.buttonContainer}>
        <Button
          variant="contained"
          className={styles.exchangeButton}
        >
          ポイントを交換する
        </Button>
      </Box>
    </Box>
  );
};

export default PointApp;