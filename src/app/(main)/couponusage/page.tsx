"use client";
import { Button, Stack, Typography } from "@mui/material";
import styles from "@/styles/couponUsage.module.css";
import Link from "next/link";

export default function CouponUsagePage() {
  return (
    <div className={styles.couponusage}>
      <Stack
        component="div"
        gap="26px"
        aria-labelledby="contactreview_heading"
        className={styles.stack}
        sx={{
          backgroundImage: 'url("/gyoza.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px",
        }}
      >
        <Typography
          id="contactreview_heading_1"
          sx={{
            fontSize: "2.0rem",
            fontWeight: "bold",
            color: "black",
          }}
        >
          餃子６個 5%OFF
        </Typography>
      </Stack>

      <Stack
        component="form"
        gap="26px"
        aria-labelledby="contact_one"
        className={styles.actionStack}
      >
        <Link href="/" passHref>
          <Button
            variant="contained"
            className={styles.button}
            sx={{ width: 150, height: 60, fontSize: "1.5rem" }}
            color="info"
          >
            使用する
          </Button>
        </Link>
        <Typography
          id="contactreview_heading"
          variant="h3"
          sx={{
            fontSize: "0.75rem",
            fontWeight: "semi-bold",
            color: "black",
          }}
        >
          ※「使用する」を押す前に、店員をお呼びください
        </Typography>
        <Typography
          id="contactreview_heading"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "black",
          }}
        >
          有効期限：2024/01/01まで
        </Typography>
        <Link href="/coupon" passHref>
          <Button variant="contained" size="large" color="info">
            戻る
          </Button>
        </Link>
        <Typography
          id="contactreview_heading"
          variant="h3"
          fontSize="0.75rem"
          fontWeight="semi-bold"
          className={styles.text}
        >
          使用するを押すと、もう一度この画面を表示することはできません
        </Typography>
      </Stack>
    </div>
  );
}
