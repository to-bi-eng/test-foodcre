import React from 'react';
import styles from '@/styles/Add_point.module.css';

export default function Login () {
    return (
    <div className='register' style={{ 
    fontFamily: 'Arial, sans-serif', 
    textAlign: 'center', 
    padding: '0px',
    maxWidth: '600px',  // 最大幅を広げる
    margin: '0 auto'  // 中央配置
}}>
    <div className={styles.title}>ポイント付与</div>
    <div className={styles.form}>
        <div className={styles.TextField_name}>
            <div className={styles.name}>名前：</div>
        </div>
        <div className={styles.TextField_mail}>
            <div className={styles.mail}>メールアドレス：</div>
        </div>
        <div className={styles.TextField_password}>
            <div className={styles.password}>パスワード：</div>
        </div>
        <div className={styles.Button}style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
        </div>
    </div>
</div>
    );
};