<<<<<<< HEAD:src/app/add_point/page.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { Typography, Container, Box, Button, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Add_point.module.css';
import { Html5QrcodeScanner, Html5QrcodeResult } from 'html5-qrcode';
=======
import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import styles from '@/styles/addPoint.module.css';
>>>>>>> 81a5fb31d46b32f30c9242bfb40d6b5020d648c5:src/app/(main)/add_point/page.tsx

export default function Add_point() {
    const router = useRouter();
    // ローディング状態とエラーメッセージを管理するためのstate
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {

        const validCodes = ['food1', 'food2', 'food3', 'food4', 'food5'];

        const scanner = new Html5QrcodeScanner(
            'qr-reader-container',
            {
                fps: 10,
                qrbox: {width: 250,height: 250},
                videoConstraints: {facingMode: 'environment'}
            },
            false
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const onScanSuccess = async (decodedText: string, _decodedResult: Html5QrcodeResult) => {
            scanner.clear().catch(error => console.error("Scanner clear failed.", error));

            setErrorMessage(''); // 古いエラーメッセージをクリア

           if (validCodes.some(code => decodedText.includes(code))) {
                router.push('/pointend');
            } else {
                // 無効なQRコードの場合
                setErrorMessage('無効なQRコードです。');
                // 無効なQRコードをスキャンした場合、再度スキャンを試せるようにカメラを再起動します
                scanner.render(onScanSuccess, onScanFailure);
            }
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const onScanFailure = (_error: unknown) => {};

        scanner.render(onScanSuccess, onScanFailure);

        return () => {
            scanner.clear().catch(error => {
                console.error("スキャナーのクリアに失敗しました。", error);
            });
        };
    }, [router]);

    const handleAddPoint = () => {
        router.push('/pointend');
    };

    return (
        <Container maxWidth="sm" className={styles.container}>
            <Typography variant="h4" gutterBottom>
                ポイント付与
            </Typography>

            <Box className={styles.qr}>
                <div id="qr-reader-container" style={{ width: '100%' }}></div>
            </Box>

            {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}

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