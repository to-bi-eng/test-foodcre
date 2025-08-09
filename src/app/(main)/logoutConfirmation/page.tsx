import React from 'react';
import styles from '@/styles/logoutConfirmation.module.css';
import { Typography, Button, Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function LogoutConfirmation() {
  const buttonStyle = {
    backgroundColor: '#4A442A',
    color: 'white',
    fontSize: '1.6rem',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    minWidth: '160px',
    '&:hover': {
      backgroundColor: '#5a543a'
    }
  };

  return (
    <div className={styles.container}>
      <Box className={styles.content}>
        <div className={styles.imageContainer}>
          <Image src="/Hachiko.png" alt="ハチコのイラスト" width={180} height={150} style={{ border: 'none' }}/>
        </div>
        <Typography variant="h3" component="h2" gutterBottom className={styles.question} sx={{ fontSize: '1.8rem' }}>
          ログアウトしますか？
        </Typography>
        <div className={styles.buttonGroup}>
          <Button
            variant="contained"
            sx={buttonStyle}
            component={Link}
            href="/logout"
          >
            はい
          </Button>
          <Button
            variant="contained"
            sx={buttonStyle}
            component={Link}
            href="/"
          >
            いいえ
          </Button>
        </div>
      </Box>
    </div>
  );
}