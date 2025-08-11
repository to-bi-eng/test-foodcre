"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/confirmRegistration.module.css';
import { Box, Button, Typography, Paper, Container, Alert, CircularProgress } from '@mui/material';

export default function ConfirmRegistration() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'メールの送信に失敗しました。');
      }

      router.push(`/one-time-password?email=${encodeURIComponent(email)}`);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'サーバーに接続できませんでした。');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!email) {
    return null;
  }

  return (
    <Container component="main" maxWidth="sm" className={styles.main}>
      <Typography variant="h3">登録内容確認</Typography>
      {error && <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert>}

      <Paper elevation={0} className={styles.infoBox}>
        <span>
          <h6 className={styles.field}>
            メールアドレス：
          </h6>
          <Typography>
            {email}
          </Typography>
        </span>
        <span>
          <h6 className={styles.field}>
            パスワード：
          </h6>
          <Typography>
           {password.length > 0 && '*'.repeat(password.length)}
          </Typography>
        </span>
      </Paper>

      <Box className={styles.button_wrapper}>
        <Button variant="contained" className={styles.button} color='info' onClick={handleBack} disabled={loading}>戻る</Button>
        <Button variant="contained" className={styles.button} color='info' onClick={handleRegister} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : '登録'}
        </Button>
      </Box>

      <Box className={styles.footerSpacer}></Box>
    </Container>
  );
}