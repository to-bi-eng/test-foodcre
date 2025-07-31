import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link'; // next/link からインポート

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
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        はちぽ
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                        component={Link} // Linkコンポーネントとして動作
                        href="/"         // to ではなく href を使用
                    >
                        ホーム
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}