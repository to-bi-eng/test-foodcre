import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Stack } from '@mui/material';
import { Home, HelpOutline, Logout, PrivacyTip } from '@mui/icons-material';
import Link from 'next/link';
import styles from '@/styles/header.module.css';

export default function Footer() {
  return (
    <Box 
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
      className={styles.box}
    >
      <AppBar 
        position="static"
        color="primary"
        className={styles.header}
      >
        <Toolbar>
          <Stack 
            direction="row" 
            justifyContent="space-around"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Link href="/" passHref>
              <IconButton sx={{ flexDirection: 'column', color: 'black' }}>
                <Home />
                <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>ホーム</Typography>
              </IconButton>
            </Link>

            <Link href="/contact" passHref>
              <IconButton sx={{ flexDirection: 'column', color: 'black' }}>
                <HelpOutline />
                <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>お問い合わせ</Typography>
              </IconButton>

            </Link>
            <Link href="/logout" passHref>
            <IconButton sx={{ flexDirection: 'column', color: 'black' }}>
              <Logout />
              <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>ログアウト</Typography>
            </IconButton>
            </Link>

            <Link href="/privacypolicy" passHref>
              <IconButton sx={{ flexDirection: 'column', color: 'black' }}>
                <PrivacyTip />
                <Typography variant="caption" sx={{ fontSize: '0.6rem', lineHeight: 1.1 }}>プライバシー</Typography>
                <Typography variant="caption" sx={{ fontSize: '0.6rem', lineHeight: 1.1 }}>ポリシー</Typography>
              </IconButton>
            </Link>
            
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}