import React from "react";
import AppBar from '@mui/material/AppBar';
import { Box, Typography, Link as MuiLink, IconButton } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from '@mui/icons-material/X';
import styles from '@/styles/Footer.module.css'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        inset: 0,
        top: 'auto',
        bottom: 0
      }}
      className={styles.box}
    >
      <AppBar
        sx={{
          padding: "16px",
        }}
        position="sticky"
        color="primary"
        className={styles.footer}
      >
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid
            size={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
            <MuiLink component={Link} href="/contact" underline="none">
              <Typography
                variant="body1"
                component="div"
                sx={{
                  color: '#333333'
                }}>
                お問い合わせ
              </Typography>
            </MuiLink>
            <MuiLink component={Link} href="https://www.hachiban.jp/" underline="none" target="blank">
              <Typography
                variant="body1"
                component="div"
                sx={{
                  color: '#333333'
                }}>
                ８番らーめん公式HP
              </Typography>
            </MuiLink>
            <MuiLink component={Link} href="https://foodcreation.github.io/" underline="none" target="blank">
              <Typography
                variant="body1"
                component="div"
                sx={{
                  color: '#333333'
                }}>
                プロジェクト公式HP
              </Typography>
            </MuiLink>
          </Grid>
          <Grid
            size={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
            <Box component='div'>
              <Box
                component='div'
                sx={{
                  display: 'flex',
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                <IconButton href="https://twitter.com/8ban_ramen" aria-label="Twitter" target="blank">
                  <XIcon />
                </IconButton>
                <IconButton href="https://www.instagram.com/8ban_ramen/" aria-label="Instagram" target="blank">
                  <InstagramIcon />
                </IconButton>
                <IconButton href="https://www.facebook.com/hachibanramen.jp/" aria-label="Facebook" target="blank">
                  <FacebookIcon />
                </IconButton>
                <IconButton href="https://www.youtube.com/user/hachibanramen" aria-label="YouTube" target="blank">
                  <YouTubeIcon />
                </IconButton>
              </Box>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  color: '#333333',
                  textAlign: 'center'
                }}>
                ８番らーめん公式SNS
              </Typography>
            </Box>
            <Box component='div'>
              <Box
                component='div'
                sx={{
                  display: 'flex',
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                <IconButton href="https://twitter.com/foodc_8ban" aria-label="Twitter" target="blank">
                  <XIcon />
                </IconButton>
                <IconButton href="https://www.instagram.com/8ban_foodc" aria-label="Instagram" target="blank">
                  <InstagramIcon />
                </IconButton>

              </Box>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  color: '#333333',
                  textAlign: 'center'
                }}>
                プロジェクト公式SNS
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}