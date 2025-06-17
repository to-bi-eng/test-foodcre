"use client"
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from '@/styles/Register.module.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';

export default function Register () {
    const [showPassword,setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    };
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
            <TextField id="outlined-basic" variant="outlined" sx={{ width: '300px' }}></TextField>
        </div>
        <div className={styles.TextField_mail}>
            <div className={styles.mail}>メールアドレス：</div>
            <TextField id="outlined-basic" variant="outlined" sx={{ width: '300px' }}></TextField>
        </div>
        <div className={styles.TextField_password}>
            <InputLabel htmlFor="outlined-adornment-password">パスワード:</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                
                }
                label="Password"
                sx={{
                    width:'300px',
                    "& input[type=password]::-ms-reveal": { display: "none", width: 0, height: 0 }, 
                    "& input[type=password]::-ms-clear": { display: "none", width: 0, height: 0 }, 
                    }}
            />
        </div>
        <div className={styles.Button}style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
            <Button variant="contained" size="large">戻る</Button>
            <Button variant="contained" size="large">次へ</Button>
        </div>
    </div>
</div>
    );
};