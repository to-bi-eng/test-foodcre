import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from '@/styles/Register.module.css';

export default function Login () {
    return (
    <div className='register' style={{ 
    fontFamily: 'Arial, sans-serif', 
    textAlign: 'center', 
    padding: '0px',
    maxWidth: '600px',  // 最大幅を広げる
    margin: '0 auto'  // 中央配置
}}>
    <div className={styles.title}>登録</div>
    <div className={styles.form}>
        <div className={styles.TextField_name}>
            <div className={styles.name}>名前：</div>
            <TextField id="outlined-basic" label="name" variant="outlined" sx={{ width: '300px' }}></TextField>
        </div>
        <div className={styles.TextField_mail}>
            <div className={styles.mail}>メールアドレス：</div>
            <TextField id="outlined-basic" label="mail" variant="outlined" sx={{ width: '300px' }}></TextField>
        </div>
        <div className={styles.TextField_password}>
            <div className={styles.password}>パスワード：</div>
            <TextField id="outlined-basic" label="password" variant="outlined" sx={{ width: '300px' }} ></TextField>
        </div>
        <div className={styles.Button}style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
            <Button variant="contained" size="large">戻る</Button>
            <Button variant="contained" size="large">次へ</Button>
        </div>
    </div>
</div>
    );
};
