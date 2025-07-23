'use client';

import React from 'react';
import { Button, Box } from '@mui/material';
import styles from '@/styles/termsOfService.module.css'; 
import { useRouter } from 'next/navigation';

export default function ConfirmUseScreen() {
  const router = useRouter();

  return (
    <Box className={styles.background}>
      <Box className={styles.card}>
        <div className={styles.content}>
          <div className={styles.title}>使用を確定します</div>
          <div className={styles.subText}>確定すると、使用済みになります</div>
          <div className={styles.buttonContainer}>
            <Button
              variant="contained"
              sx={{
                width: 120,
                height: 54,
                fontSize: '1.35rem',
                borderRadius: '14px',
                backgroundColor: '#3a2e16',
                color: '#fff',
                fontWeight: 'bold',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#2c210f',
                },
              }}
              onClick={() => router.back()}
            >
              戻る
            </Button>
            <Button
              variant="contained"
              sx={{
                width: 120,
                height: 54,
                fontSize: '1.35rem',
                borderRadius: '14px',
                backgroundColor: '#3a2e16',
                color: '#fff',
                fontWeight: 'bold',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#2c210f',
                },
              }}
              onClick={() => router.push('/')}
            >
              確定
            </Button>
          </div>
        </div>
      </Box>
    </Box>
  );
}