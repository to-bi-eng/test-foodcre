import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Stack } from '@mui/material';
import Link from 'next/link'; 
import Image from 'next/image'; 
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
                    <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
                            <Image src="/logo.png" alt="ロゴ" width={30} height={30} />
                            <Typography variant="h6" component="div">
                                はちぽ
                            </Typography>
                        </Stack>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}