"use client"
import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Login () {
    return (
    <div>
    <Header></Header>
    <div className='register' style={{ 
    fontFamily: 'Arial, sans-serif', 
    textAlign: 'center', 
    padding: '0px',
    maxWidth: '600px',  // 最大幅を広げる
    margin: '0 auto'  // 中央配置
}}>
    <h1 style={{ color: '#4b3f2e', fontSize: '2.5rem' }}>登録</h1>
    <form style={{ display: 'inline-block', textAlign: 'left', marginTop: '0px' }}>
        <div style={{ marginBottom: '15px' }}>
            <TextField id="outlined-basic" label="name" variant="outlined"></TextField>
        </div>
        <div style={{ marginBottom: '15px' }}>
            <TextField id="outlined-basic" label="mail" variant="outlined" ></TextField>
        </div>
        <div style={{ marginBottom: '30px' }}>
            <TextField id="outlined-basic" label="password" variant="outlined" ></TextField>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
            <Button variant="contained" size="large">戻る</Button>
            <Button variant="contained" size="large">次へ</Button>
        </div>
    </form>
</div>

    <Footer></Footer>
    </div>
    );
};
