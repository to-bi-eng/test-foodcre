'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Typography, Container, Box, Alert, CircularProgress, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from '@/styles/addPoint.module.css';
import jsQR from 'jsqr';

export default function Add_point() {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scanning, setScanning] = useState(true);
    const streamRef = useRef<MediaStream | null>(null);

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    const handleRetry = () => {
        setMessage('');
        setIsError(false);
        setLoading(false);
        setScanning(true);
    };

    useEffect(() => {
        if (!scanning) {
            stopCamera();
            return;
        }

        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        facingMode: 'environment',
                        width: { ideal: 600 },
                        height: { ideal: 600 }
                    } 
                });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play().catch(error => {
                        if (error instanceof DOMException && error.name === 'AbortError') {
                            console.log("Video play() was interrupted, this is expected.");
                        } else {
                            throw error;
                        }
                    });
                }
                requestAnimationFrame(scanLoop);
            } catch {
                router.push('/qr-error-ui');

            }
        };

        const scanLoop = () => {
            if (scanning) {
                scanQRCode();
                requestAnimationFrame(scanLoop);
            }
        };

        const scanQRCode = async () => {
            if (!videoRef.current || !canvasRef.current || !scanning) return;
            
            const video = videoRef.current;
            if (video.readyState !== video.HAVE_ENOUGH_DATA) return;
            
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
                setLoading(true);
                setMessage('');
                setIsError(false);
                
                try {
                    const validCodes = ['food1', 'food2', 'food3', 'food4', 'food5'];
                    const isValid = validCodes.some(validCode => code.data.includes(validCode));

                    if (!isValid) {
                        throw new Error("無効なQRコードです。");
                    }

                    const userId = '1';

                    const response = await fetch('/api/points/add', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: userId }),
                    });

                    const result = await response.json();

                    if (!response.ok) {
                        throw new Error(result.message || 'ポイントの付与に失敗しました。');
                    }
                    
                    router.push(`/pointend?addPoints=${result.addPoints}&totalPoints=${result.totalPoints}`);

                } catch (error) {
                    stopCamera();
                    let errorMessage = '予期せぬエラーが発生しました。';
                    if (error instanceof Error) {
                        errorMessage = error.message;
                    }
                    setMessage(errorMessage);
                    setIsError(true);
                    setLoading(false);
                }
            }
        };

        startCamera();

        return () => {
            stopCamera();
        };
    }, [router, scanning]);

    return (
        <Container maxWidth="sm" className={styles.container}>
            <Typography variant="h4" gutterBottom>
                ポイント付与
            </Typography>

            <Box className={styles.qr}>
                {scanning && (
                    <video
                        ref={videoRef}
                        playsInline 
                        muted
                        autoPlay
                        style={{ width: '300px', height: '300px' }}
                    />
                )}
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                {loading && (
                    <Box sx={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <CircularProgress color="inherit" sx={{ color: 'white' }} />
                    </Box>
                )}
            </Box>
            
            {message && <Alert severity={isError ? "error" : "info"} sx={{ mt: 2 }}>{message}</Alert>}
            
            {isError && !loading && (
                <Button onClick={handleRetry} variant="contained" className={styles.button} sx={{ mt: 2 , mb: 2 }}>
                    もう一度試す
                </Button>
            )}

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