"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '@/styles/ConfirmRegistration.module.css';
import { Box, Button, Typography, Paper, Container } from '@mui/material';

export default function ConfirmRegistration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const password = searchParams.get('password') || '';

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('登録が完了しました。');
        router.push('/');
      } else {
        const errorData = await response.json();
        alert(`登録に失敗しました: ${errorData.message}`);
      }
    } catch (error) {
      console.error('登録処理中にエラーが発生しました:', error);
      alert('登録処理中にエラーが発生しました。');
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Box className={styles.wrapper}>
        <Container component="main" maxWidth="sm" className={styles.main}>
          <Typography variant="h5" className={styles.heading}>
            登録内容確認
          </Typography>

          <Paper elevation={3} className={styles.infoBox}>
            <Typography className={styles.field}><strong>メールアドレス:</strong><br />{email}</Typography>
            <Typography className={styles.field}><strong>パスワード:</strong><br />********************</Typography>
          </Paper>

          <Box className={styles.buttonGroup}>
            <Button variant="contained" className={styles.button} onClick={handleBack}>
              戻る
            </Button>
            <Button variant="contained" className={styles.button} onClick={handleRegister}>
              登録
            </Button>
          </Box>

          <Box className={styles.footerSpacer}></Box>
        </Container>
      </Box>
    </>
  );
}
