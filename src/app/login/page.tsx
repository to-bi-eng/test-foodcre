import React from "react";
import styles from "@/styles/Login.module.css";
import { Box, Button, Stack, TextField, Typography, Link } from "@mui/material";

// 共通TextFieldスタイル
const commonTextFieldSx = {
  '& .MuiFilledInput-root': {
    backgroundColor: 'transparent',
    borderBottom: 'none',
  },
  '& .MuiFilledInput-underline:before': {
    borderBottom: 'none',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottom: 'none',
  },
};

export default function LoginPage() {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.container}>
        <Typography variant="h3" className={styles.title} pt={8}>
          ログイン
        </Typography>

        <Stack spacing={3} pt={1}>
          <Box>
            <Typography className={styles.label}>メールアドレス</Typography>
            <TextField
              variant="filled"
              placeholder="mail"
              fullWidth
              className={styles.input}
              sx={commonTextFieldSx}
            />
          </Box>

          <Box>
            <Typography className={styles.label}>パスワード</Typography>
            <TextField
              type="password"
              variant="filled"
              placeholder="password"
              fullWidth
              className={styles.input}
              sx={commonTextFieldSx}
            />

            <Box className={styles.linkWrapper}>
              <Link href="#" underline="hover" color="blue" fontSize={14}>
                パスワード変更
              </Link>
            </Box>
          </Box>

          <Stack direction="row" spacing={1} justifyContent="center" pt={8}>
            <Button variant="contained" className={styles.button}>
              戻る
            </Button>
            <Button variant="contained" className={styles.button}>
              ログイン
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
