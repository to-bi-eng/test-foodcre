import React from 'react';
import styles from '@/styles/Point_Usage.module.css';
import { Box, Typography, Divider, Button } from '@mui/material';
import Image from 'next/image';
import Link from "next/link";

type CouponCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  discount: number;
  points: number;
  detailHref: string;
};

const CouponCard: React.FC<CouponCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  discount,
  points,
  detailHref,
}) => (
  <Box className={styles.framework}>
    <Box
      component="section"
      sx={{ mt: "20px", mb: "10px", ml: "10px" }}
      className={styles.row}
    >
      <Image src={imageSrc} alt={imageAlt} width="60" height="70" />
      <Box sx={{ ml: "10px" }} className={styles.coupon}>
        <Typography textAlign="center" variant="h4" fontSize="1.3rem">
          {title}
        </Typography>
        <Typography textAlign="center" variant="h4" fontSize="1.4rem">
          {discount}%off
        </Typography>
      </Box>
    </Box>
    <Typography textAlign="center" fontSize="1.1rem">
      {points}ポイント使用
    </Typography>
    <Divider
      orientation="horizontal"
      sx={{
        borderBottomWidth: "3px",
        borderColor: "#000000",
        mt: "5px",
        mb: "5px",
      }}
    />
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Link href={detailHref} passHref legacyBehavior>
        <Button variant="contained" color="info" component="a" sx={{ textDecoration: "none" }}>
          詳細
        </Button>
      </Link>
    </Box>
  </Box>
);


export default function Usage() {
    return (
        <div className={ styles.page }>
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
              className={ styles.possession }
              >
                <Typography
                    variant='h2'
                    fontSize="1.5rem"
                    textAlign="center"
                    color="secondary"
                    fontWeight="bold"
                    sx={{ mt: "10px"}}
                    >
                        現在の所有ポイント：
                </Typography>
                <Typography
                    variant='h2'
                    fontSize="1.8rem"
                    textAlign="center"
                    color="secondary"
                    fontWeight="bold"
                    sx={{ mb: "10px"}}
                    >
                        〇ポイント
                </Typography>
            </Box>
            <Box
              component="section"
              sx={{ mt: "15px" }}
              className={ styles.precaution }
              >
                <Typography
                  variant='h3'
                  fontSize="1.2rem"
                  >
                    ※有効期限は引き換えてから
                </Typography>
                <Box
                component="section"
                className={ styles.subdivision }
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
                </ Box>
            </ Box>
            <Box
              sx={{ mt: "40px" }}
              maxWidth="400px"
              className={styles.box}
            >
              <CouponCard
                imageSrc="/hachiko.png"
                imageAlt="餃子6個"
                title="餃子6個"
                discount={5}
                points={0}
                detailHref="/"
              />
              <CouponCard
                imageSrc="/hachiko.png"
                imageAlt="餃子12個"
                title="餃子12個"
                discount={5}
                points={0}
                detailHref="/"
              />
            </Box>
            <Box
              sx={{ mt: "20px" }}
              maxWidth="400px"
              className={styles.box}
            >
              <CouponCard
                imageSrc="/hachiko.png"
                imageAlt="餃子6個"
                title="餃子6個"
                discount={5}
                points={0}
                detailHref="/"
              />
              <CouponCard
                imageSrc="/hachiko.png"
                imageAlt="餃子12個"
                title="餃子12個"
                discount={5}
                points={0}
                detailHref="/"
              />
            </Box>
        </div>
    )
}