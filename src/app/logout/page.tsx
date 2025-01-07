// pages/logout.js
import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Padding } from '@mui/icons-material';
export default function LogoutScreen()  {
  return (
    <>
    <Header/>
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', backgroundColor: '#fff', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <img src="hachiko.png" alt="Character" style={{ width: '100px', height: '80px' }}/>
        <h2>ログアウトしました</h2>
        <button style={{ padding: '10px 20px', backgroundColor: '#4B4B4B', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>OK</button>
      </div>
      
    </div><Footer/></>
  );
};