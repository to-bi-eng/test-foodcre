import React from 'react';
import styles from '@/styles/Individual_Point_Usage.module.css';

const GyozaCoupon = () => {
  return (
    <div className={styles.couponContainer}>
      <div className={styles.imageContainer}>
        <img src="/Ramen.png" alt="ラーメン画像" className={styles.couponImage} />
        <p className={styles.discountText}>餃子6個</p>
        <p className={styles.discountPercent}>5%off</p>
      </div>

      <div className={styles.infoContainer}>
        <p className={styles.pointExchangeText}>○ポイントと引き換えます</p>
        <p className={styles.validityText}>※有効期限は引き換えてから</p>
        <p className={styles.validityPeriodText}>○ヶ月後です</p>
      </div>

      {/* ボタンを縦に中央揃えで配置 */}
      <div className={styles.buttonContainer}>
        <button className={styles.redeemButton}>クーポンに引き換える</button>
        <button className={styles.backButton}>戻る</button>
      </div>
    </div>
  );
};

export default GyozaCoupon;
