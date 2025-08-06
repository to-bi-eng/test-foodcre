"use client";
import React, { useState, useEffect } from "react";
// useRouterとuseSearchParamsをインポート
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "@/styles/oneTimePassword.module.css";
import { Box, Button, Stack, TextField, Typography, Link, CircularProgress } from "@mui/material";

// (commonTextFieldSxは変更なしのため省略)
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

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  // エラーメッセージとローディング状態を管理するstate
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ルーターとURLパラメータを取得するためのフック
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // URLからemailを取得

  // ページ読み込み時にemailがなければ、前のページに戻す
  useEffect(() => {
    if (!email) {
      alert("メールアドレスが指定されていません。登録ページに戻ります。");
      router.push('/register'); // 仮に登録ページを'/signup'とする
    }
  }, [email, router]);

  // 「認証」ボタンの処理
  const handleVerify = async () => {
    if (!otp || otp.length < 6) {
      setError("6桁の認証コードを入力してください。");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/verify-otp', { // APIのエンドポイントを指定
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        // APIから返されたエラーメッセージを表示
        throw new Error(data.error || '認証に失敗しました。');
      }

      // 成功した場合
      alert(data.message); // "アカウント登録が完了しました。"
      router.push('/login'); // ログインページへ遷移

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 「戻る」ボタンの処理
  const handleBack = () => {
    router.back();
  }

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
              inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '1.2rem', letterSpacing: '0.5em' } }}
              error={!!error} // エラーがある場合にTextFieldをエラー表示にする
            />
            {/* エラーメッセージの表示エリア */}
            {error && (
              <Typography color="error" variant="body2" mt={1}>
                {error}
              </Typography>
            )}
            <Box className={styles.linkWrapper}>
              <Link href="#" underline="hover" color="primary" fontSize={14}>
                認証コードを再送
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