import { notFound } from "next/navigation";
import styles from "@/styles/Individual_Point_Usage.module.css";
import { Box, Typography, Button, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type Menu = {
  id: number;
  menu_name: string;
  point_cost: number;
  quantity: number;
  discount: number;
};

export default async function IndividualPointUsage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const res = await fetch(`http://localhost:3000/api/menus/${id}`, { cache: "no-store" });
  if (!res.ok) return notFound();

  const menu: Menu | null = await res.json();
  if (!menu) return notFound();

  return (
    <Container maxWidth="sm" className={styles.couponContainer}>
      <Box className={styles.a}>
        <Box className={styles.imageContainer}>
          <Image src="/Ramen.png"
            alt="ラーメン画像"
            width={300}
            height={200}
            style={{ width: '100%', height: 'auto' }} />
          <Typography className={styles.discountText}>
            {menu.menu_name}{menu.quantity}個
          </Typography>
          <Typography className={styles.discountPercent} variant="inherit" component="div">
            {menu.discount}% OFF
          </Typography>
        </Box>
        <Box className={styles.infoContainer}>
          <Typography className={styles.attention} variant='h6'>
            {menu.point_cost}ポイントと引き換えます
          </Typography>
        </Box>
        <Box className={styles.buttonContainer}>
          <Link href="/points_to_coupons" passHref>
            <Button variant="contained" disableElevation className={styles.redeemButton}>
              クーポンに引き換える
            </Button>
          </Link>
          <Link href="/points_to_coupons" passHref>
            <Button variant="outlined" className={styles.backButton}>
              戻る
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}