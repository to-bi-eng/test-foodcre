import React from "react";
import AppBar from '@mui/material/AppBar';
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import styles from '@/styles/Footer.module.css'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        position: "fixed",
        inset: 0,
        top: 'auto',
        bottom: 0
      }}
      className={styles.box}
    >
      <AppBar sx={{
        padding: "16px",
      }}
        color="primary"
        className={styles.footer}
      >
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid size={6}>

          </Grid>
          <Grid size={6}>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}