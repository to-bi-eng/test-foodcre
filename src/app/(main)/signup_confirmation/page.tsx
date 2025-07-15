import React from 'react';
import styles from '@/styles/confirmRegistration.module.css';
import { Box, Button, Typography, Paper, Container } from '@mui/material';

export default function ConfirmRegistration() {
  return (
    <>
      <Box className={styles.wrapper}>
        <Container component="main" maxWidth="sm" className={styles.main}>
          <Typography variant="h5" className={styles.heading}>
            登録内容確認
          </Typography>

          <Paper elevation={3} className={styles.infoBox}>
            <Typography><strong>名前:</strong><br />工大太郎</Typography>
            <Typography className={styles.field}><strong>メールアドレス:</strong><br />c1234567@st.kanazawa-it.ac.jp</Typography>
            <Typography className={styles.field}><strong>パスワード:</strong><br />********************</Typography>
          </Paper>

          <Box className={styles.buttonGroup}>
            <Button variant="contained" className={styles.button}>
              戻る
            </Button>
            <Button variant="contained" className={styles.button}>
              登録
            </Button>
          </Box>

          <Box className={styles.footerSpacer}></Box>
        </Container>
      </Box>
    </>
  );
}
