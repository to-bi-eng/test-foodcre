"use client";
import { useSearchParams } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import styles from "@/styles/pointsToCoupons.module.css";

// コンポーネント名を変更
export default function PointsToCouponsContent() {
  const searchParams = useSearchParams();
  const remainingPoints = Number(searchParams.get("remainingPoints") ?? 0);

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
        <Button
          className={styles.couponButton}
          variant="contained"
          fullWidth
          component={Link}
          href="/coupon_list"
        >
          クーポン一覧
        </Button>
      </Box>
    </Box>
  );
}