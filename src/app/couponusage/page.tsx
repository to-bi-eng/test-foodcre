"use client";
import { Button, Stack, Typography } from "@mui/material";
import styles from "@/styles/CouponUsage.module.css";
import Link from "next/link";

export default function CouponUsagePage() {
  return (
    <div className={styles.couponusage}>
      <Stack
        component="form"
        gap="26px"
        aria-labelledby="contact_one"
        className={styles.stack}
        sx={{
          backgroundImage: 'url("/gyoza.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px",
        }}
      >
        <Typography
          id="contactreview_heading"
          sx={{
            fontSize: "2.0rem",
            fontWeight: "bold",
            color: "black",
          }}
        >
          餃子６個 5%oFF
        </Typography>
      </Stack>

      <Stack
        component="form"
        gap="26px"
        aria-labelledby="contact_one"
        className={styles.stack2}
      >
        <Button
        variant="contained"
        className={styles.button}
        sx={{ width: 150, height: 60, fontSize:"1.5rem" }}
        color="info"
      >
        使用する
      </Button>
      <Typography
        id="contactreview_heading"
        sx={{
        variant:"h3",
        fontSize: "0.75rem",
        fontWeight:"semi-bold",
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
        <Link href="/" passHref>
          <Button variant="contained" size="large" color="info">
            ホーム
          </Button>
        </Link>
        <Typography
          id="contactreview_heading"
          variant="h3"
          fontSize="0.75rem"
          fontWeight="semi-bold"
          className={styles.text}
        >
          ホームに戻ると、もう一度この画面を表示することはできません
        </Typography>
      </Stack>
    </div>
  );
}
