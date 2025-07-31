"use client"
import React from 'react';
import { Button, TextField, OutlinedInput, InputAdornment, IconButton, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from '@/styles/register.module.css';
import Link from 'next/link';

export default function Register() {
    const [showPassword, setShowPassword] = React.useState(false);
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
            maxWidth: '600px',
            margin: '0 auto'
        }}>

            <div className={styles.title}>登録</div>
            <div className={styles.form}>
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
                            width: '300px',
                            "& input[type=password]::-ms-reveal": { display: "none", width: 0, height: 0 },
                            "& input[type=password]::-ms-clear": { display: "none", width: 0, height: 0 },
                        }}
                    />
                </div>
                <div className={styles.Button} style={{ display: 'flex', justifyContent: 'space-between', width: '300px', marginTop: '20px' }}>
                    <Button variant="contained" size="large" component={Link} href="/">
                        戻る
                    </Button>
                    <Button variant="contained" size="large" component={Link} href="/signup_confirmation">
                        次へ
                    </Button>
                </div>
            </div>
        </div>
    );
};