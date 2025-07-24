'use client';

import React from 'react';
import Header from '@/app/(main)/components/Header/Header';
import Footer from '@/app/(main)/components/Footer/Footer';
import styles from '@/styles/termsOfService.module.css';
import { Button, Box, Typography, Container, Paper } from '@mui/material';

export default function LogoutScreen() {

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
