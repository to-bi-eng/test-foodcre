"use client";
import { Button, Stack, TextField,Typography,Link as MuiLink} from "@mui/material";
import React from "react";
import Link from "next/link";
import { useState , useEffect} from 'react';
import { useRouter } from "next/navigation";

import styles from '@/styles/Contact.module.css'

export default function Contact() {      
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        const savedData = sessionStorage.getItem('contactData');
        if (savedData) {
            const { name, email, subject, message } = JSON.parse(savedData);
            setName(name);
            setEmail(email);
            setSubject(subject);
            setMessage(message);
        }
    }, []);

    useEffect(() => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        setIsFormValid(!!name && !!email && !!subject && !!message && isEmailValid);
    }, [name, email, subject, message, isEmailValid]);
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault(); 
        if (!isFormValid) {
            e.preventDefault();
            alert("すべてのフィールドを正しく入力してください。");
        } else {
            sessionStorage.setItem('contactData', JSON.stringify({ name, email, subject, message }));
            router.push('/contactreview');
        }
    };

    return (
    <>
        <div className={styles.contact}>
            <Stack
                component="form" 
                gap="26px" 
                aria-labelledby="contact_one" 
                className={styles.stack} 
            >
                <Typography
                    id="contact_heading" 
                    variant="h1" 
                    fontSize="2.0rem"
                    fontWeight="bold"
                >
                    お問い合わせ
                </Typography>
                <Typography
                    id="contact_explanation" 
                    variant="h2" 
                    fontSize="1.25rem"
                >
                    下記のフォームに必要事項をご入力ください。
                </Typography>
                <Typography
                    id="contact_explanation" 
                    variant="h3" 
                    fontSize="1.00rem"
                >
                    ご入力いただきました個人情報については、適切な管理を実施しております。詳しくは、「プライバシーポリシー」をご覧ください。
                </Typography>
                <Typography
                    id="contact_explanation" 
                    variant="h3" 
                    fontSize="1.00rem"
                >
                    このアプリに関して8番らーめん公式様に問い合わせされるのは、ご遠慮ください
                </Typography>
                <TextField required id="name" label="お名前(必須)"  className={styles.text} placeholder="例:工大太郎" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField required id="mail" label="メールアドレス(必須)" className={styles.text} placeholder="例:c1234567@st.kanazawa-it.ac.jp" value={email} onChange={(e) => setEmail(e.target.value)} error={!isEmailValid && email !== ''} helperText={!isEmailValid && email !== '' ? '有効なメールアドレスを入力してください。' : ''}
                />
                <TextField required id="subject" label="件名(必須)" className={styles.text} placeholder="例:○○について"  value={subject} onChange={(e) => setSubject(e.target.value)}/>
                <TextField required  multiline maxRows={10} id="message" label="お問い合わせ内容(必須)" className={styles.text} placeholder="お問い合わせ内容をお書きください"  value={message} onChange={(e) => setMessage(e.target.value)}/>
                
                <div>
                <MuiLink component={Link} href="/contactreview" underline="none" onClick={handleSave} >
                    <Button variant="contained" size="large" disabled={!isFormValid}>確認</Button>
                </MuiLink>
                </div>
            </Stack>
        </div>
    </>
);
}