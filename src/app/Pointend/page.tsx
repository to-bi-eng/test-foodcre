'use client'
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styles from '../../styles/Pointend.module.css';

interface PointAppProps {
  plusPoints: number;
  totalPoints: number;
}

const PointApp: React.FC<PointAppProps> = ({ plusPoints, totalPoints }) => {
  return (
    <Box className={styles.container}>
      {/* ポイント付与メッセージ */}
      <Box className={styles.awardedPointsContainer}>
        <Typography variant="h4" className={styles.awardedPointsText}>
          {plusPoints}ポイント付与
          <br />
          されました！
        </Typography>
      </Box>

      {/* 現在の所有ポイント表示 */}
      <Box className={styles.totalPointsContainer}>
        <Typography className={styles.totalPointsText}>
          現在の所有ポイント：
          <br />
          {totalPoints}ポイント
        </Typography>
      </Box>

      {/* メッセージ */}
      <Box className={styles.MessageContainer}>
        <Typography className={styles.MessageText}>
          getしたポイントを交換して
          <br />
          クーポンを手に入れよう！！
        </Typography>
      </Box>

      {/* ポイント交換ボタン */}
      <br />
      <Box className={styles.buttonContainer}>
        <Button
          variant="contained"
          className={styles.exchangeButton}
          disableElevation
        >
          ポイントを交換する
        </Button>
      </Box>
    </Box>
  );
};

export default PointApp;