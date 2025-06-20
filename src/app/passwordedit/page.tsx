"use client";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useState , useEffect } from 'react';
import { useRouter } from "next/navigation";
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from '@/styles/passwordedit.module.css';

export default function Passwordedit() {      
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);
   const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowPassword2 = () => setShowPassword2((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleMouseDownPassword2 = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
    const [passwordedit, setpasswordedit] = useState('');
const [passwordconfirm, setpasswordconfirm] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const router = useRouter();
    const [error, setError] = useState('');

    useEffect(() => {
    setIsFormValid(!!passwordedit && !!passwordconfirm);
  }, [passwordedit, passwordconfirm]);


  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError("すべてのフィールドを入力してください。");
    } else if (passwordedit !== passwordconfirm) {
      setError("パスワードが一致しません。");
    } else {
      setError('');
      sessionStorage.setItem('contactData', JSON.stringify({ passwordedit }));
      router.push('/');
    }
  };

    return (
    <>
        <div className={ styles.passwordedit }>
            <Stack
                component="form" 
                gap="26px" 
                aria-labelledby="contact_one" 
                className={ styles.stack } 
            >
                <Typography
                    id="contact_heading" 
                    variant="h1" 
                    fontSize="2.0rem"
                    fontWeight="bold"
                    >
                    パスワード変更
                </Typography>
                <div className={styles.forms}>
                  <div className={styles.form}>
                  <Typography
                    id="edit_heading"
                    >
                    新しいパスワード
                </Typography>
                <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" className={ styles.Typography }>
                <InputLabel htmlFor="outlined-adornment-password">新しいパスワード</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setpasswordedit(e.target.value)}
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
            className={styles.edit}
          />
        </FormControl>
        </div>
        <Typography
                    id="edit_heading" 
                    >
                    新しいパスワード（確認）
                </Typography>
        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" color="primary">
                <InputLabel htmlFor="outlined-adornment-password" color="primary">新しいパスワード（確認）</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword2 ? 'text' : 'password'}
                    onChange={(e) => setpasswordconfirm(e.target.value)}
                    endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword2 ? 'hide the password' : 'display the password'
                  }
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}  
                  onMouseUp={handleMouseUpPassword2}
                  edge="end"
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            className="edit"
          />
        </FormControl></div>
        
                <div className={styles.button}>
                  {error && (
          <Typography color="error" fontSize="0.9rem" sx={{ mt: 2, mb: 2 }}>{error}</Typography>
        )}
                    <Button variant="contained" size="large" disabled={!isFormValid}
            onClick={handleSave} color="info" >登録</Button>
                </div>
            </Stack>
        </div>
    </>
);
}