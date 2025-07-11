import React from 'react';
import { Box, Link,  } from '@mui/material';
import styles from '@/styles/homeIcon.module.css';
import Image from 'next/image';
import News from '@/app/(main)/components/Top-page/News';

const pointicon = '/point_change.png';
const qrcord = '/QR.png';
const coupon = '/coupon.png';

const HomeIcon: React.FC = () => {
    return (
        <div>
            <div className={styles.container}>
                <Link href="/point_usage" className={styles.actionItem}>
                    <Image src={pointicon} alt="ポイント交換" width={60} height={60} className={styles.icon} />
                    <span className={styles.label}>ポイント交換</span>
                </Link>
                <Link href="/add_point" className={styles.actionItem}>
                    <Image src={qrcord} alt="ポイント付与" width={60} height={60} className={styles.icon} />
                    <span className={styles.label}>ポイント付与</span>
                </Link>
                <Link href="/" className={styles.actionItem}>
                    <Image src={coupon} alt="クーポン一覧" width={60} height={60} className={styles.icon} />
                    <span className={styles.label}>クーポン一覧</span>
                </Link>
            </div>
            <Box display="flex" justifyContent="flex-end" mt={1} mr="5px">
                <Image src="/hachiko.png" alt="キャラクター" width="70" height="70" />
            </Box>
            <Box className={styles.news}>
                <News />
            </Box>
        </div>
    );
};

export default HomeIcon;