"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/individualPointUsage.module.css";
import { Box, Typography, Button, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

type Menu = {
  id: number;
  menu_name: string;
  point_cost: number;
  discount: number;
};

export default function IndividualPointUsage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [menu, setMenu] = useState<Menu | null>(null);
  const [userPoints, setUserPoints] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/menus/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("メニュー情報の取得に失敗しました");
        return res.json();
      })
      .then(setMenu)
      .catch(() => setError("メニュー情報の取得に失敗しました"));
  }, [id]);

  useEffect(() => {
    fetch("/api/points/current")
      .then(res => {
        if (!res.ok) throw new Error("ポイント情報の取得に失敗しました");
        return res.json();
      })
      .then(data => setUserPoints(data.points))
      .catch(() => setError("ポイント情報の取得に失敗しました"));
  }, []);

  if (!menu || userPoints === null) return null;


  const handleExchange = async () => {
    setLoading(true);
    setError(null);
    if (userPoints < menu.point_cost) {
      setError("所持ポイントが足りません");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/points/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, couponId: menu.id }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(`/points_to_coupons?remainingPoints=${data.remainingPoints}`);
      } else {
        setError(data.message || "引き換えに失敗しました");
      }
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className={styles.couponContainer}>
      <Box className={styles.imageContainer}>
        <Image src="/Ramen.png"
          alt="ラーメン画像"
          width={300}
          height={200}
          style={{ width: '100%', height: 'auto' }} />
        <Box className={styles.centeredTextBox}>
          <Typography className={styles.menuName}>
            {menu.menu_name}<br /><br />
            {menu.discount}円引き
          </Typography>
        </Box>
      </Box>
      <Box className={styles.infoContainer}>
        <Typography className={styles.attention} variant='h6'>
          {menu.point_cost}ポイントと引き換えます
        </Typography>
      </Box>
      {error && (
        <Typography color="error" align="center" mb={2}>
          {error}
        </Typography>
      )}
      <Box className={styles.buttonContainer}>
        <Button
          variant="contained"
          disableElevation
          className={styles.redeemButton}
          onClick={handleExchange}
          disabled={loading}
        >
          {loading ? "処理中..." : "クーポンに引き換える"}
        </Button>
        <Button
          variant="outlined"
          className={styles.backButton}
          component={Link}
          href="/point_usage"
        >
          戻る
        </Button>
      </Box>
    </Container>
  );
}