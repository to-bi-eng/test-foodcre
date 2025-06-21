"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/ConfirmRegistration.module.css';
import { Box, Button, Typography, Paper, Container, Alert } from '@mui/material';

export default function ConfirmRegistration() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('registrationEmail');
    const storedPassword = sessionStorage.getItem('registrationPassword');

    if (!storedEmail || !storedPassword) {
      alert('登録情報が見つかりません。お手数ですが、再度登録手続きをお願いします。');
      router.push('/register');
    } else {
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, [router]);

  const handleRegister = async () => {
    setError('');
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      sessionStorage.removeItem('registrationEmail');
      sessionStorage.removeItem('registrationPassword');

      if (response.ok) {
        alert('登録が完了しました。');
        router.push('/'); //現状トップページにリダイレクトするようにしています。適宜修正してください。
      } else {
        const errorData = await response.json();
        setError(`登録に失敗しました: ${errorData.message}`);
      }
    } catch {
      setError('登録処理中にエラーが発生しました。お手数ですが、アプリ管理者への連絡をお願いします。');
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!email) {
    return null;
  }

  return (
    <>
      <Box className={styles.wrapper}>
        <Container component="main" maxWidth="sm" className={styles.main}>
          <Typography variant="h5" className={styles.heading}>
            登録内容確認
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Paper elevation={3} className={styles.infoBox}>
            <Typography className={styles.field}><strong>メールアドレス:</strong><br />{email}</Typography>
            <Typography className={styles.field}><strong>パスワード:</strong><br />********************</Typography>
          </Paper>

          <Box className={styles.buttonGroup}>
            <Button variant="contained" className={styles.button} onClick={handleBack}>
              戻る
            </Button>
            <Button variant="contained" className={styles.button} onClick={handleRegister} disabled={!!error}>
              登録
            </Button>
          </Box>

          <Box className={styles.footerSpacer}></Box>
        </Container>
      </Box>
    </>
  );
}
