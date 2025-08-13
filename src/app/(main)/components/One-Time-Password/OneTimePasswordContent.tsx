"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "@/styles/oneTimePassword.module.css";
import { Box, Button, Stack, TextField, Typography, Link, CircularProgress } from "@mui/material";

const commonTextFieldSx = {
  '& .MuiFilledInput-root': {
    backgroundColor: '#E6E6E6',
    borderRadius: '10px',
    '&:before, &:after, &:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
  },
  '& .MuiFilledInput-input': {
    padding: '12px 15px',
    color: '#333',
  },
};

export default function OneTimePasswordContent() { // コンポーネント名を変更
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendStatus, setResendStatus] = useState({ message: "", error: false });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleVerify = async () => {
    if (!otp || otp.length < 6) {
      setError("6桁の認証コードを入力してください。");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '認証に失敗しました。');
      }

      router.push('/');
    
    } catch (err) {
        let errorMessage = '認証に失敗しました。';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  }

  const handleResendOtp = async () => {
    if (isResending || resendCooldown > 0) return;

    setIsResending(true);
    setResendStatus({ message: "", error: false });

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "再送に失敗しました。");
      }

      setResendStatus({ message: "認証コードを再送しました。", error: false });
      setResendCooldown(60);

    } catch (err) {
        let errorMessage = "再送に失敗しました。";
        if (err instanceof Error) {
            errorMessage = err.message;
        }
      setResendStatus({ message: errorMessage, error: true });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.container}>
        <Typography variant="h3" className={styles.title} pt={8}>
          認証コード入力
        </Typography>

        <Typography className={styles.description} pt={4}>
          <Box component="span" fontWeight="bold">{email}</Box> に送信された6桁の認証コードを入力してください。
        </Typography>

        <Stack spacing={3} pt={2}>
          <Box>
            <Typography className={styles.label}>認証コード</Typography>
            <TextField
              variant="filled"
              placeholder="000000"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={commonTextFieldSx}
              inputProps={{
                maxLength: 6,
              }}
              slotProps={{
                input: {
                  style: { textAlign: 'center', fontSize: '1.2rem', letterSpacing: '0.5em' }
                }
              }}
              error={!!error}
            />
            {error && (
              <Typography color="error" variant="body2" mt={1}>
                {error}
              </Typography>
            )}

            <Box className={styles.linkWrapper}>
               {resendStatus.message && (
                <Typography color={resendStatus.error ? "error" : "primary"} variant="body2" sx={{ mb: 1 }}>
                  {resendStatus.message}
                </Typography>
              )}
              <Link
                component="button"
                variant="body2"
                onClick={handleResendOtp}
                disabled={isResending || resendCooldown > 0}
                underline="hover"
                sx={{ fontSize: 14, cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
              >
                {isResending
                  ? "再送中..."
                  : resendCooldown > 0
                    ? `${resendCooldown}秒後に再送可能`
                    : "認証コードを再送"}
              </Link>
            </Box>
          </Box>

          <Stack direction="row" spacing={2} justifyContent="center" pt={8}>
            <Button variant="contained" className={`${styles.button} ${styles.backButton}`} onClick={handleBack} disabled={loading}>
              戻る
            </Button>
            <Button variant="contained" className={`${styles.button} ${styles.submitButton}`} onClick={handleVerify} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : '認証'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
