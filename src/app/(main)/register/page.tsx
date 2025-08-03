"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl, Alert, Typography, Container } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from '@/styles/register.module.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleNext();
        }
    };

    const handleNext = async () => {
        setError('');
        setSuccess(false);
        if (!email || !password) {
            setError('メールアドレスとパスワードを入力してください。');
            return;
        }
        if (
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
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]+$/;
        if (!passwordRegex.test(password)) {
            setError('パスワードには平仮名、カタカナ、スペース、絵文字などの文字は使用できません。');
            return;
        }
        setLoading(true);
        try {
            // ここでAPIにリクエスト
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'エラーが発生しました。');
                setLoading(false);
                return;
            }
            // 成功時はストレージに保存し、確認画面へ遷移
            sessionStorage.setItem('registrationEmail', email);
            sessionStorage.setItem('registrationPassword', password);
            setSuccess(true);
            router.push('/signup_confirmation');
        } catch {
            setError('サーバーに接続できませんでした。');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <Container component="main" maxWidth="sm" className={styles.main}>
            <Typography variant="h3">登録</Typography>
            <div className={styles.form} onKeyDown={handleKeyDown}>
                {error && <Alert severity="error" sx={{ mb: 2, width: '350px' }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2, width: '350px' }}>確認メールを送信しました。</Alert>}
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="メールアドレス"
                    type="email"
                    color='info'
                    sx={{ width: '300px' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl sx={{ width: '300px' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" color='info'>パスワード</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        required
                        color='info'
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
                <Box className={styles.button_wrapper}>
                    <Button variant="contained" className={styles.button} onClick={handleBack} color='info'>戻る</Button>
                    <Button
                        variant="contained"
                        className={styles.button}
                        onClick={handleNext}
                        color='info'
                        disabled={loading}
                    >
                        {loading ? '送信中...' : '次へ'}
                    </Button>
                </Box>
            </div>
        </Container>
    );
};