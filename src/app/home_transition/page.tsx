import React from 'react';
import Link from 'next/link';
import styles from '@/styles/home_transition.module.css';

const pointicon = '/path/to/your/icon/exchange.png';
const pointadd = '/path/to/your/icon/qr-code.png';
const coupon = '/path/to/your/icon/coupon.png';

const HomeTransition: React.FC = () => {
    return (
        <div>
            {/* カードのスペースのための空の div */}
            <div style={{ height: '160px', marginBottom: '20px' }}>
            </div>

            <div className={styles.container}>
                <Link href="/point-exchange" className={styles.actionItem}>
                    <img src={pointicon} alt="ポイント交換" className={styles.icon} />
                    <span className={styles.label}>ポイント交換</span>
                </Link>
                <Link href="/grant-point" className={`${styles.actionItem} ${styles.highlightedItem}`}>
                    <img src={pointadd} alt="ポイント付与" className={styles.icon} />
                    <span className={styles.label}>ポイント付与</span>
                </Link>
                <Link href="/coupon-list" className={styles.actionItem}>
                    <img src={coupon} alt="クーポン一覧" className={styles.icon} />
                    <span className={styles.label}>クーポン一覧</span>
                </Link>
            </div>
        </div>
    );
};

export default HomeTransition;