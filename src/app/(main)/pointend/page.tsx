'use client'
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styles from '@/styles/pointEnd.module.css';

interface PointAppProps {
  plusPoints: number;
  totalPoints: number;
}

const PointApp: React.FC<PointAppProps> = ({ plusPoints, totalPoints }) => {
  return (
    <Box className={styles.container}>
      {/* ポイント付与メッセージ */}
      <Box className={styles.awardPoint}>
        <Typography variant="h4">
          {plusPoints}ポイント付与
          <br />
          されました！
        </Typography>
      </Box>

      {/* 現在の所有ポイント表示 */}
      <Box className={styles.totalPoint}>
        <Typography variant="h5">
          現在の所有ポイント：
          <br/>
          {totalPoints}ポイント
        </Typography>
      </Box>

      {/* メッセージ */}
      <Typography className={styles.Message}>
        getしたポイントを交換して
        <br />
        クーポンを手に入れよう！！
      </Typography>

      {/* ポイント交換ボタン */}
      <Button className={styles.button}
        variant="contained">
        ポイントを交換する
      </Button>
    </Box>
  );
};

export default PointApp;