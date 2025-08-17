"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/styles/pointUsage.module.css';
import Link from "next/link";
import { Box, Typography, Divider, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';

type Menu = {
  id: number;
  title: string;
  description: string;
  discount: number;
  points: number;
  detailHref: string;
};

type MenuCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  discount: number;
  points: number;
  detailHref: string;
};

const MenuCard: React.FC<MenuCardProps> = ({
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
      <Button
        variant="contained"
        color="info"
        sx={{ textDecoration: "none", width: "40px", fontSize: "0.9rem", p: 0.5 }}
        component={Link}
        href={detailHref}
      >
        詳細
      </Button>
    </Box>
  </Box>
);

export default function Usage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/menus/list')
      .then(res => {
        if (!res.ok) throw new Error("メニュー一覧の取得に失敗しました");
        return res.json();
      })
      .then(data => setMenus(data.menus || []))
      .catch(() => {
        setMenus([]);
        setError("メニュー一覧の取得に失敗しました");
      })
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
            {menus.map((menu) => (
              <MenuCard
                key={menu.id}
                imageSrc="/hachiko.png"
                imageAlt={menu.title}
                title={menu.title}
                discount={menu.discount}
                points={menu.points}
                detailHref={`/individual_point_usage/${menu.id}`}
              />
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
}