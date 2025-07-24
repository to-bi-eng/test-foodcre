'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Typography, Container, Box, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from '@/styles/addPoint.module.css';
import jsQR from 'jsqr';

export default function Add_point() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scanning, setScanning] = useState(true);

    useEffect(() => {
        let stream: MediaStream | null = null;
        let scanInterval: NodeJS.Timeout;

        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                      facingMode: 'environment',
                      width: { ideal: 600 },
                      height: { ideal: 600 }
                    } 
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
                scanInterval = setInterval(scanQRCode, 500);
            } catch {
                setErrorMessage('カメラの起動に失敗しました');
            }
        };

        const validCodes = ['food1', 'food2', 'food3', 'food4', 'food5'];

        const scanQRCode = () => {
            if (!videoRef.current || !canvasRef.current || !scanning) return;
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code && code.data) {
                setScanning(false);
                setErrorMessage('');
                if (validCodes.some(c => code.data.includes(c))) {
                    router.push('/pointend');
                } else {
                    setErrorMessage('無効なQRコードです。');
                    setScanning(true);
                }
            }
        };

        startCamera();

        return () => {
            setScanning(false);
            if (scanInterval) clearInterval(scanInterval);
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [router]);

    return (
        <Container maxWidth="sm" className={styles.container}>
            <Typography variant="h4" gutterBottom>
                ポイント付与
            </Typography>

            <Box className={styles.qr}>
                <video
                    ref={videoRef}
                    playsInline 
                    muted
                    autoPlay
                    style={{ width: '100%', height: '300px' }}
                />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </Box>

            {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}

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