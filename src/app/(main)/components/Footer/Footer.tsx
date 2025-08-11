import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image'; 
import { Home } from '@mui/icons-material'; 
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
            {/* ホーム */}
            <Link href="/" passHref>
              <IconButton sx={{ flexDirection: 'column', color: 'black' }}>
                <Home />
                <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>ホーム</Typography>
              </IconButton>
            </Link>

            {/* ポイント交換 */}
            <Link href="/point_usage" passHref>
              <IconButton sx={{ flexDirection: 'column', color: 'black' }}>
                <Image src="/point_change.png" alt="ポイント交換" width={24} height={24} />
                <Typography variant="caption" sx={{ fontSize: '0.6rem', mt: 0.5 }}>ポイント交換</Typography>
              </IconButton>
            </Link>

            {/* ポイント付与 */}
            <Link href="/add_point" passHref>
              <IconButton sx={{ flexDirection: 'column', color: 'black' }}>
                <Image src="/QR.png" alt="ポイント付与" width={24} height={24} />
                <Typography variant="caption" sx={{ fontSize: '0.6rem', mt: 0.5 }}>ポイント付与</Typography>
              </IconButton>
            </Link>

            {/* クーポン一覧 */}
            <Link href="/coupon_list" passHref>
              <IconButton sx={{ flexDirection: 'column', color: 'black' }}>
                <Image src="/coupon.png" alt="クーポン一覧" width={24} height={24} />
                <Typography variant="caption" sx={{ fontSize: '0.6rem', mt: 0.5 }}>クーポン一覧</Typography>
              </IconButton>
            </Link>
            
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}