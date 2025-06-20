import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import styles from '@/styles/Add_point.module.css';

export default function Add_point() {
    return (
        <Container maxWidth="sm" className={styles.container}>
        <Typography variant="h4" gutterBottom>
            ポイント付与
        </Typography>

        <Box className={styles.qr}>
            <Typography variant="caption" color="textSecondary">
            QRコード
            </Typography>
        </Box>

        <Box className={styles.textBox}>
            <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
            店内に設置されている
            {'\n'}QRコードを会計時に
            {'\n'}読み取ってください
            </Typography>
        </Box>

        <Typography className={styles.note}>
            ※一日に一度のみポイントが
            {'\n'}加算されます
        </Typography>
        </Container>
    );
    }
