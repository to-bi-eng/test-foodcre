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
        <div className={styles.QR}></div>
        <div className={styles.TextField_name}>
            <div className={styles.Text1}>
                {"店内に設置されている\nQRコードを会計時に\n読み取ってください"
                .split('\n')
                .map((line, index) => (
                    <React.Fragment key={index}>
                    {line}
                    <br />
                    </React.Fragment>
                ))}
            </div>
            </div>
            <div className={styles.Text2}>
            {"※一日に一度のみポイントが\n加算されます"
                .split('\n')
                .map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
                ))}
            </div>

    </div>
</div>
    );
};