'use client';

import React from 'react';
<<<<<<< HEAD:src/app/terms_of_service/page.tsx
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from '@/styles/teamsOfService.module.css'; 
=======
import Header from '@/app/(main)/components/Header/Header';
import Footer from '@/app/(main)/components/Footer/Footer';
import styles from '@/styles/Teams_of_service.module.css'; // CSSモジュール名が正しいか注意
>>>>>>> 41bc4b4d134a6066f5068fc213bc9c54c356f3ba:src/app/(main)/terms_of_service/page.tsx
import { Button, Box, Typography, Container, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LogoutScreen() {
  const router = useRouter();

  return (
    <>
      <Header />
      <Box className={styles.background}>
        <Container maxWidth="sm">
          <Paper elevation={3} className={styles.card}>
            <Box className={styles.content}>
              <Typography variant="h4" gutterBottom>
                本当に使用しますか？
              </Typography>
              <Typography variant="h6" color="textSecondary">
                次に進むと戻ることはできません
              </Typography>
              <Box className={styles.buttonContainer}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={styles.button}
                  //onClick={() => router.push('/home')}
                >
                  いいえ
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={styles.button}
                  //onClick={() => router.push('/goodbye')}
                >
                  はい
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
