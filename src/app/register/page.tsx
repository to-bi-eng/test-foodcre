import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Button from '@mui/material/Button';

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
            <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontSize: '1.2rem' }}>名前</label>
            <input
                type="text"
                id="name"
                placeholder="name"
                style={{
                    width: '300px',  // 入力欄の幅を大きく
                    padding: '12px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '6px'
                }}
            />
        </div>
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontSize: '1.2rem' }}>メールアドレス</label>
            <input
                type="email"
                id="email"
                placeholder="mail"
                style={{
                    width: '300px',
                    padding: '12px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '6px'
                }}
            />
        </div>
        <div style={{ marginBottom: '30px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontSize: '1.2rem' }}>パスワード</label>
            <input
                type="password"
                id="password"
                placeholder="password"
                style={{
                    width: '300px',
                    padding: '12px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '6px'
                }}
            />
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
