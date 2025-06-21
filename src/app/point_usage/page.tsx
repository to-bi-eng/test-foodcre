"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Point_Usage.module.css';
import { Box, Typography, Divider, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';
import Link from "next/link";

type Coupon = {
  id: number | string;
  title: string;
  description: string;
  discount?: number;
  points?: number;
  detailHref?: string;
};

type CouponCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  discount?: number;
  points?: number;
  detailHref?: string;
};

const CouponCard: React.FC<CouponCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  discount,
  points,
  detailHref,
}) => (
  <Box
    className={styles.couponCard}
    sx={{
      width: 150,
      minHeight: 180,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: 2,
      borderRadius: 2,
      p: 1,
      m: 1,
      background: "#fff",
      wordBreak: "break-word",
    }}
  >
    <Image src={imageSrc} alt={imageAlt} width={50} height={55} />
    <Typography textAlign="center" fontWeight="bold" fontSize="1rem" sx={{ mt: 1 }}>
      {title}
    </Typography>
    {discount !== undefined && (
      <Typography textAlign="center" fontSize="1.1rem">
        {discount}%off
      </Typography>
    )}
    {points !== undefined && (
      <Typography textAlign="center" fontSize="0.95rem">
        {points}ポイント使用
      </Typography>
    )}
    <Divider
      orientation="horizontal"
      sx={{
        borderBottomWidth: "2px",
        borderColor: "#000000",
        mt: "5px",
        mb: "5px",
        width: "100%",
      }}
    />
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Link href={detailHref || "/"} passHref>
        <Button
          variant="contained"
          color="info"
          sx={{ textDecoration: "none", width: "100%", fontSize: "0.9rem", p: 0.5 }}
        >
          詳細
        </Button>
      </Link>
    </Box>
  </Box>
);

export default function Usage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/coupons/owned')
      .then(res => res.json())
      .then(data => setCoupons(data.coupons || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <Typography
        variant='h1'
        fontSize="2.5rem"
        fontWeight="bold"
        textAlign="center"
      >
        ポイント交換
      </Typography>
      <Box
        component="section"
        sx={{ mt: "40px" }}
        className={styles.possession}
      >
        <Typography
          variant='h2'
          fontSize="1.5rem"
          textAlign="center"
          color="secondary"
          fontWeight="bold"
          sx={{ mt: "10px" }}
        >
          現在の所有ポイント：
        </Typography>
        <Typography
          variant='h2'
          fontSize="1.8rem"
          textAlign="center"
          color="secondary"
          fontWeight="bold"
          sx={{ mb: "10px" }}
        >
          〇ポイント
        </Typography>
      </Box>
      <Box
        component="section"
        sx={{ mt: "15px" }}
        className={styles.precaution}
      >
        <Typography
          variant='h3'
          fontSize="1.2rem"
        >
          ※有効期限は引き換えてから
        </Typography>
        <Box
          component="section"
          className={styles.subdivision}
          sx={{ display: "flex", alignItems: "flex-end" }}
        >
          <Typography
            variant='h3'
            fontSize="1.8rem"
            fontWeight="bold"
          >
            〇か月後
          </Typography>
          <Typography
            variant='h3'
            fontSize="1.2rem"
          >
            です。
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mt: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className={styles.box}
      >
        {loading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr" },
              gap: 1.5,
              width: "100%",
              maxWidth: 350,
              justifyItems: "center",
            }}
          >
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                imageSrc="/hachiko.png"
                imageAlt={coupon.title}
                title={coupon.title}
                discount={coupon.discount}
                points={coupon.points}
                detailHref={`/coupon/${coupon.id}`}
              />
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
}