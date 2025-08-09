"use client";
import Link from 'next/link';
import React, { useState } from "react";
import styles from "@/styles/login.module.css";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    setError("");
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
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
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
              <Typography
                component={Link}
                href="/passwordedit"
                sx={{
                  color: 'blue',
                  fontSize: 14,
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                パスワード変更
              </Typography>
            </Box>
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <Stack direction="row" spacing={1} justifyContent="center" pt={8}>
            <Button variant="contained" className={styles.button} component={Link} href="/">
              戻る
            </Button>
            <Button
              variant="contained"
              className={styles.button}
              onClick={handleLogin}
            >
              ログイン
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}