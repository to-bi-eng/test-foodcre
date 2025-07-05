"use client";

import styles from '@/styles/top.module.css';
import News from '@/app/(main)/components/Top-page/News';
import { Box, Typography, Link, Button } from '@mui/material';
import Image from 'next/image';

export default function Logout() {
  return (
    <div className={styles.page}>
      <Box marginLeft="5px">
        <Image src="/hachiko.png" alt="8番らーめんロゴ" width="70" height="70" className={styles.logo} />
      </Box>
      <Box mb={6}>
        <Typography variant="h6" fontSize="1.4rem" align="center">
          “8番らーめん”に来店して<br />
          ポイントを貯めて<br />
          お得なクーポンをゲットしよう！
        </Typography>
      </Box>
      <Typography variant="h6" fontSize='1.3rem' align="center">
        このアプリでは、“8番らーめん<br />
        工大前店”でのみポイントの付与、<br />
        クーポンの使用ができます
      </Typography>
      <Box display="flex" justifyContent="flex-end" mt={1} mr="5px">
        <Image src="/hachiko.png" alt="キャラクター" width="70" height="70" />
      </Box>
      <Box className={styles.news}>
        <News />
      </Box>
      <Box className={styles.fixedButtons}>
        <Link href="/register">
          <Button variant="contained" color="info" sx={{ fontSize: '1.5rem', px: 4, borderRadius: 3 }}>
            新規登録
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="contained" color="info" sx={{ fontSize: '1.5rem', px: 4, borderRadius: 3 }}>
            ログイン
          </Button>
        </Link>
      </Box>
    </div>
  );
}