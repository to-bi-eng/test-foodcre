"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/ConfirmRegistration.module.css';
import { Box, Button, Typography, Paper, Container, Alert } from '@mui/material';
import { signIn } from "next-auth/react";

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // 登録成功後に自動ログイン
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setError("自動ログインに失敗しました。ログイン画面から再度ログインしてください。");
      } else {
        window.location.replace("/"); // トップページへ
      }
    } else {
      const errorData = await response.json();
      setError(`登録に失敗しました: ${errorData.message}`);
    }
  } catch {
    setError('登録処理中にエラーが発生しました。お手数ですが、アプリ管理者へのお問い合わせをお願いします。');
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
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
            *********
          </Typography>
        </span>
      </Paper>

      <Box className={styles.button_wrapper}>
        <Button variant="contained" className={styles.button} color='info' onClick={handleBack}>戻る</Button>
        <Button variant="contained" className={styles.button} color='info' onClick={handleRegister} disabled={!!error}>登録</Button>
      </Box>

      <Box className={styles.footerSpacer}></Box>
    </Container>
  );
}