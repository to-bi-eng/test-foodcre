import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Button from '@mui/material/Button';

export default function Signup() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '50vh' }}>
            <Header />
            <div style={{ 
                flex: 1, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                fontFamily: 'Arial, sans-serif', 
                textAlign: 'center', 
                padding: '20px'
            }}>
                <div style={{ 
                    maxWidth: '500px',  
                    width: '100%', 
                    textAlign: 'center'
                }}>
                    <h1 style={{ color: '#4b3f2e', fontSize: '2.5rem' }}>登録内容確認</h1>
                    <div style={{ 
                        display: 'inline-block', 
                        textAlign: 'left', 
                        padding: '20px', 
                        border: '2px solid red', 
                        borderRadius: '6px', 
                        backgroundColor: '#fff', 
                        marginTop: '20px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}>
                        <p style={{ fontSize: '1.2rem', marginBottom: '15px' }}>
                            <strong>名前:</strong> 工太太郎
                        </p>
                        <p style={{ fontSize: '1.2rem', marginBottom: '15px' }}>
                            <strong>メールアドレス:</strong> c1234567@st-kanazawa.ac.jp
                        </p>
                        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
                            <strong>パスワード:</strong> ********************        
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', margin: '0 auto' }}>
                            <Button variant="contained" size="large">戻る</Button>
                            <Button variant="contained" size="large">登録</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
