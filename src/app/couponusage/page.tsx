"use client";
import { Button, Stack, Typography } from "@mui/material";
import styles from '@/styles/CouponUsage.module.css';
import Link from "next/link";

export default function CouponUsagePage() {
    return (
    <div className={ styles.couponusage }>
        <Stack
            component="form" 
                gap="26px" 
                aria-labelledby="contact_one" 
                className={ styles.stack } 
            >
    <Typography
               id="contactreview_heading"
               variant="h1"
               fontSize="2.0rem"
               fontWeight="bold"
               >
           餃子６個 5%oFF
    </Typography>







    <Link href="/" passHref>
            <Button variant="contained" size="large"  color="info">ホーム</Button>
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