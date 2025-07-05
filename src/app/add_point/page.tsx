'use client'
import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Add_point.module.css';

export default function Add_point() {
    const router = useRouter();

    const handleAddPoint = () => {
        router.push('/pointend');
    };

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

        <Button
            variant="contained"
            color="primary"
            onClick={handleAddPoint}
            sx={{ mt: 3, mb: 2 }}
        >
            ポイント付与
        </Button>

        <Typography className={styles.note}>
            ※一日に一度のみポイントが
            {'\n'}加算されます
        </Typography>
        </Container>
    );
    }
