import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function ConfirmRegistration() {
  return (
    <>
      <Header />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh', // フッター固定前提
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#fff',
        }}
      >
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>登録内容確認</h2>

          <div
            style={{
              border: '2px solid red',
              padding: '20px',
              marginBottom: '40px',
              width: '100%',
              maxWidth: '400px',
              textAlign: 'left',
              backgroundColor: '#fff',
            }}
          >
            <p><strong>名前:</strong><br />工大太郎</p>
            <p style={{ marginTop: '20px' }}><strong>メールアドレス:</strong><br />c1234567@st-kanazawa.ac.jp</p>
            <p style={{ marginTop: '20px' }}><strong>パスワード:</strong><br />********************</p>
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#4B4B4B',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '100px',
              }}
            >
              戻る
            </button>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#4B4B4B',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '100px',
              }}
            >
              登録
            </button>
          </div>

          {/* ←←← フッターに被らないように余白追加 */}
          <div style={{ height: '100px' }}></div>
        </main>

        <Footer />
      </div>
    </>
  );
}
