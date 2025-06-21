"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from '@/styles/Register.module.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleNext = () => {
        router.push(`/signup_confirmation?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className={styles.main}>
            <div className={styles.title}>登録</div>
            <div className={styles.form}>
                <div className={styles.TextField_mail}>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="メールアドレス"
                        sx={{ width: '300px' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.TextField_password}>
                    <FormControl sx={{ width: '300px' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">パスワード</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        />
                    </FormControl>
                </div>
                <div className={styles.Button} style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
                    <Button variant="contained" size="large" onClick={handleBack}>戻る</Button>
                    <Button variant="contained" size="large" onClick={handleNext}>次へ</Button>
                </div>
            </div>
        </div>
    );
};