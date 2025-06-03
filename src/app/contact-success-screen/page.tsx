'use client';
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import styles from './contact-success-screen.module.css';

export default function SentConfirmation() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      spacing={4}
      className={styles.container}
    >
      <Typography variant="h4" className={styles.title}>
        送信しました
      </Typography>
      <Typography variant="body1" className={styles.text}>
        @food.comから始まるアドレスから<br />
        返信をさせていただく場合がございます
      </Typography>
      <Button
        variant="contained"
        onClick={handleBackToHome}
        className={styles.button}
      >
        ホームに戻る
      </Button>
    </Stack>
  );
}
