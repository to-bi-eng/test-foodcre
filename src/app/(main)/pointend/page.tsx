'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';
import styles from '@/styles/pointEnd.module.css';

const PointEndPage = () => {
  // URLのクエリパラメータを取得するためのフック
  const searchParams = useSearchParams();

  // URLから 'addPoints' と 'totalPoints' の値を取得
  // 値が存在しない、または数値でない場合は 0 を使用する
  const addPoints = Number(searchParams.get('addPoints')) || 0;
  const totalPoints = Number(searchParams.get('totalPoints')) || 0;

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
      <Button className={styles.button} variant="contained">
        ポイントを交換する
      </Button>
    </Box>
  );
};

export default PointEndPage;