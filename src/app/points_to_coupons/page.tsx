"use client";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import styles from "@/styles/PointsToCoupons.module.css";

type Props = {
  remainingPoints: number;
};

export default function PointsToCoupons({ remainingPoints=0 }: Props) {
  return (
    <Box className={styles.container}>
      <Typography className={styles.title} variant="h4" align="center">
        引き換えられました
      </Typography>
      <Box className={styles.pointBox}>
        引き換え後のポイント：<br />
        <span className={styles.point}>{remainingPoints}ポイント</span>
      </Box>
      <Typography variant="h5" align="center">
        クーポン一覧から<br />
        ご使用いただけます
      </Typography>
      <Box display="flex" justifyContent="center" mt={2}>
        <Link href="/" passHref>
          <Button className={styles.couponButton} variant="contained" fullWidth>
            クーポン一覧
          </Button>
        </Link>
      </Box>
    </Box>
  );
}