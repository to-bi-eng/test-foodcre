"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from '@/styles/Register.module.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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
        setError('');
        if (!email || !password) {
            setError('メールアドレスとパスワードは必須です。');
            return;
        }
        if ( //大学発行のメールアドレスかどうかのチェック
            !email.endsWith('@neptune.kanazawa-it.ac.jp') &&
            !email.endsWith('@his.kanazawa-it.ac.jp') &&
            !email.endsWith('@infor.kanazawa-it.ac.jp') &&
            !email.endsWith('@tok.kanazawa-it.ac.jp') &&
            !email.endsWith('@ael.kanazawa-it.ac.jp') &&
            !email.endsWith('@trc.kanazawa-it.ac.jp') &&
            !email.endsWith('@ict-.kanazawa-it.ac.jp') &&
            !email.endsWith('@eagle.ict-.kanazawa-it.ac.jp') &&
            !email.endsWith('@pt.kanazawa-it.ac.jp') &&
            !email.endsWith('@planet.kanazawa-it.ac.jp') &&
            !email.endsWith('@jupiter.kanazawa-it.ac.jp') &&
            !email.endsWith('@st.kanazawa-it.ac.jp')
        ) {
            setError('メールアドレスは大学から発行されたものを使用してください。');
            return;
        }
        if (password.length < 8) {
            setError('パスワードは8文字以上で入力してください。');
            return;
        }
        try {
            sessionStorage.setItem('registrationEmail', email);
            sessionStorage.setItem('registrationPassword', password);
            router.push('/signup_confirmation');
        } catch {
            setError('ブラウザのストレージにアクセスできません。設定を確認してください。');
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className={styles.main}>
            <div className={styles.title}>登録</div>
            <div className={styles.form}>
                {error && <Alert severity="error" sx={{ mb: 2, width: '350px' }}>{error}</Alert>}
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