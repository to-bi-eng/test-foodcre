// pages/logout.js
import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function LogoutScreen() {
  return (
    <>
      <Header />
      {/* 外側の背景色を設定するdivを追加 */}
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', paddingTop: '50px', paddingBottom: '50px' }}>
        
        <div
          style={{
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            backgroundColor: '#fff', // 中央のカードは白
            height: '50vh',
            margin: 'auto', // 中央寄せ
            width: '90%',
            maxWidth: '500px', // 最大幅制限
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '2px solid #B388FF', 
            borderRadius: '0px',
            //boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // 影もつけるとオシャレ
            padding: '20px',
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h1 style={{ fontSize: '45px',marginTop: '10px' }}>本当に使用しますか？</h1>
            <h2 style={{ fontSize: '25px', marginTop: '10px', color: '#555' }}>
              次に進むと戻ることはできません
            </h2>

            <div style={{ marginTop: '30px', display: 'flex', gap: '50px' }}>
              <button
                style={{
                  padding: '0px 10px',
                  width: '120px',
                  height: '60px',
                  backgroundColor: '#573f2c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '30px',
                }}
              >
                いいえ
              </button>

              <button
                style={{
                  padding: '0px 30px',
                  width: '120px',
                  height: '60px',
                  backgroundColor: '#573f2c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '30px',
                }}
              >
                はい 
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
