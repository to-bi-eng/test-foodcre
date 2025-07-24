'use client'
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import styles from '@/styles/pointEnd.module.css';

interface PointAppProps {
  addPoints: number;
  totalPoints: number;
}

const PointEndPage = () => {
  const [addPoints, setAddPoints] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);

   useEffect(() => {
    // ここでユーザーIDなど必要な情報を取得してAPIに渡してください
    const userId = '1'; 
    fetch('/api/points/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('APIレスポンス:', data); 
        setAddPoints(data.addPoints ?? 0);
        setTotalPoints(data.totalPoints ?? 0);
      });
  }, []);

  return <PointApp addPoints={addPoints} totalPoints={totalPoints} />;
}

const PointApp: React.FC<PointAppProps> = ({ addPoints, totalPoints }) => {
  return (
    <Box className={styles.container}>
      {/* ポイント付与メッセージ */}
      <Box className={styles.awardPoint}>
        <Typography variant="h4">
          {addPoints}ポイント付与
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

export default PointEndPage;