import React from "react";
import styles from "@/styles/Login.module.css";
import { Button, Stack, TextField, Typography, Link } from "@mui/material";

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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Typography variant="h3" className={styles.title}>
          ログイン
        </Typography>

        <Stack spacing={3} pt={1}>
          <div>
            <Typography className={styles.label}>メールアドレス</Typography>
            <TextField
            variant="filled"
            placeholder="mail"
            fullWidth
            className={styles.input}
            sx={commonTextFieldSx}
            />

          </div>

          <div>
            <Typography className={styles.label}>パスワード</Typography>
            <TextField
              type="password"
              variant="filled"
              placeholder="password"
              fullWidth
              className={styles.input}
              sx={commonTextFieldSx}
            />

            <div className={styles.linkWrapper}>
              <Link href="#" underline="hover" color="blue" fontSize={14}>
                パスワード変更
              </Link>
            </div>
          </div>

          <Stack direction="row" spacing={1} justifyContent="center" pt={8}>
            <Button variant="contained" className={styles.button}>
              戻る
            </Button>
            <Button variant="contained" className={styles.button}>
              ログイン
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}
