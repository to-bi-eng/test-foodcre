import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Stack, IconButton } from '@mui/material';
// import Link from 'next/link';
import styles from '@/styles/header.module.css';

export default function Header() {
    return (
        <Box sx={{
            flexGrow: 1,
            position: "fixed",
            inset: 0,
            top: 0,
            bottom: "auto",
            zIndex: 1,
        }} className={styles.box}>
            <AppBar position="sticky" color="primary" className={styles.header}>
                <Toolbar sx={{ paddingLeft: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
                        <IconButton color="inherit" size="large">
                           <img src="/logo.png" alt="ロゴ" style={{ height: '30px' }} />
                        </IconButton>
                        <Typography variant="h6" component="div">
                            はちぽ
                        </Typography>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}