"use client";
import { Button, Stack, Typography, Box } from "@mui/material";
import styles from '@/styles/Contact_confirm.module.css';
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Contact_confirm() {
    const [ contactData, setContactData ] = useState({ name: '', email: '', subject: '', content: '' });
  useEffect(() => {
    const data = sessionStorage.getItem('contactData');
    if (data) {
      setContactData(JSON.parse(data));
    }
  }, []);
  return(
  <>
    <div className={ styles.contact_confirm }>
      <Stack
        component="form"
        gap="26px"
        aria-labelledby="contactreview_one"
        className={ styles.stack }
        >
        <Typography
          id="contactreview_heading"
          variant="h1"
          fontSize="2.0rem"
          fontWeight="bold"
          >
          入力内容の確認
        </Typography>
        <Typography
          id="contactreview_explanation"
          variant="h2"
          fontSize="1.25rem"
          >
          入力内容に問題がなければ、送信ボタンを押してください。
        </Typography>
        <Box
          component="section" 
          sx={{ 
            width: 330,
            borderRadius: 1,
            bgcolor: 'primary.main',
            color:'white',
            flexGrow: 1,
          }} 
          className={ styles.box }
          >
          <div className={ styles.text }>
            <Typography variant="body1" fontSize="1rem" sx={{ padding:0.5 }}>お名前: { contactData.name }</Typography>
            <Typography variant="body1" fontSize="1rem" sx={{ padding:0.5 }}>メールアドレス: { contactData.email }</Typography>
            <Typography variant="body1" fontSize="1rem" sx={{ padding:1 }}>件名: { contactData.subject }</Typography>
            <Typography variant="body1" fontSize="1rem" sx={{ padding:1 }}>お問い合わせ内容: { contactData.content }</Typography>
          </div>     
        </Box>  
        <Stack direction="row" spacing={ 8 }>
          <Link href="/contact" passHref>
            <Button variant="contained" size="large" color="info">戻る</Button>
          </Link>
          <Link href="/contactok" passHref>
            <Button variant="contained" size="large"  color="info">送信</Button>
          </Link>
        </Stack>
      </Stack>
    </div>
  </>
);
}