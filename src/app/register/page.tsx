"use client"
import React from 'react';
import { Button, TextField, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from '@/styles/Register.module.css';

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
        <div className={styles.main}>
            <div className={styles.title}>登録</div>
            <div className={styles.form}>
                <div className={styles.TextField_mail}>
                    <TextField id="outlined-basic" variant="outlined" label="メールアドレス" sx={{ width: '300px' }}></TextField>
                </div>
                <div className={styles.TextField_password}>
                    <FormControl sx={{ width: '300px' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">パスワード</InputLabel>
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
                        />
                    </FormControl>
                </div>
                <div className={styles.Button} style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
                    <Button variant="contained" size="large">戻る</Button>
                    <Button variant="contained" size="large">次へ</Button>
                </div>
            </div>
        </div>
    );
};