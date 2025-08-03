"use client";
import React, { useState } from "react";
import styles from "@/styles/login.module.css";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";

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

const handleLogin = async () => {
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });
  if (result?.error) {
    setError("メールアドレスまたはパスワードが間違っています");
  } else {
    router.push("/"); // ログイン後の遷移先
  }
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

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
              type={showPassword ? "text" : "password"}
              variant="filled"
              placeholder="password"
              fullWidth
              className={styles.input}
              sx={commonTextFieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
