'use client';
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";

export default function SentConfirmation() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/'); // ホームに戻る
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      spacing={4}
      sx={{ backgroundColor: "#fdfbf7", px: 2 }}
    >
      <Typography variant="h1" fontSize="2.5rem" fontWeight="bold" align="center">
        送信しました
      </Typography>
      <Typography variant="body1" align="center" fontSize="1rem" lineHeight={1.8}>
        @food.comから始まるアドレスから<br />
        返信をさせていただく場合がございます
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#2B2306',
          fontSize: '1.25rem',
          px: 5,
          py: 2,
          borderRadius: '16px',
          '&:hover': { backgroundColor: '#1f1a04' }
        }}
        onClick={handleBackToHome}
      >
        <Typography
          color="secondary">
            ホームに戻る
          </Typography>
      </Button>
    </Stack>
  );
}







