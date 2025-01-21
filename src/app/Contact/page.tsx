import { Button, Stack, TextField,Typography,Link as MuiLink, Grid2 } from "@mui/material";
import React from "react";
import Link from "next/link";

import styles from '@/styles/Contact.module.css'

export default function Contact() {      
    return (
    <>
        <div className={styles.contact}>
            <Stack
                component="form" 
                gap="26px" 
                aria-labelledby="contact_one" 
                className={styles.stack} 
                sx={{
                    alignItems:"cente"
                }}
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
                <TextField required id="contact-name" label="お名前(必須)"  className={styles.text} placeholder="例:工大太郎"  />
                <TextField required id="contact-mail" label="メールアドレス(必須)" className={styles.text} placeholder="例:c1234567@st.kanazawa-it.ac.jp"/>
                <TextField required id="contact-about" label="件名(必須)" className={styles.text} placeholder="例:○○について"/>
                <TextField required  multiline maxRows={10} id="contact-main" label="お問い合わせ内容(必須)" className={styles.text} placeholder="お問い合わせ内容をお書きください"/>
                <MuiLink component={Link} href="/ContactConfirmation" underline="none">
                    <Button variant="contained" size="large" className={styles.botton}>確認</Button>
                </MuiLink>
            </Stack>
        </div>
    </>
  );
}