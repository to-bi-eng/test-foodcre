"use client";
import {
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/styles/contact.module.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [about, setAbout] = useState("");
  const [main, setMain] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!name || !mail || !about || !main) {
      setMessage("全ての項目を入力してください");
      return;
    }

    if (
      !mail.endsWith('@neptune.kanazawa-it.ac.jp') &&
      !mail.endsWith('@his.kanazawa-it.ac.jp') &&
      !mail.endsWith('@infor.kanazawa-it.ac.jp') &&
      !mail.endsWith('@tok.kanazawa-it.ac.jp') &&
      !mail.endsWith('@ael.kanazawa-it.ac.jp') &&
      !mail.endsWith('@trc.kanazawa-it.ac.jp') &&
      !mail.endsWith('@ict-.kanazawa-it.ac.jp') &&
      !mail.endsWith('@eagle.ict-.kanazawa-it.ac.jp') &&
      !mail.endsWith('@pt.kanazawa-it.ac.jp') &&
      !mail.endsWith('@planet.kanazawa-it.ac.jp') &&
      !mail.endsWith('@jupiter.kanazawa-it.ac.jp') &&
      !mail.endsWith('@st.kanazawa-it.ac.jp')
    ) {
      setMessage("メールアドレスは大学から発行されたものを使用してください。");
      return;
    }
    
    sessionStorage.setItem(
      "contactData",
      JSON.stringify({
        name,
        email: mail,
        subject: about,
        content: main,
      })
    );

    router.push("/contact_confirm");
  };

  return (
    <div className={styles.contact}>
      <Stack
        component="form"
        gap="26px"
        aria-labelledby="contact_one"
        className={styles.stack}
        sx={{ alignItems: "center" }}
        onSubmit={handleConfirm}
      >
        <Typography
          id="contact_one"
          variant="h1"
          fontSize="2.0rem"
          fontWeight="bold"
        >
          お問い合わせ
        </Typography>
        
        <Typography id="contact_explanation_main" variant="h2" fontSize="1.25rem">
          下記のフォームに必要事項をご入力ください。
        </Typography>
        
        <Typography id="contact_privacy_notice" variant="h3" fontSize="1.00rem">
          ご入力いただきました個人情報については、適切な管理を実施しております。詳しくは、
          <Link href="/privacypolicy">「プライバシーポリシー」</Link>
          をご覧ください。
        </Typography>
        
        <Typography id="contact_disclaimer" variant="h3" fontSize="1.00rem">
          このアプリに関して8番らーめん公式様に問い合わせされるのは、ご遠慮ください
        </Typography>

        <TextField
          required
          id="contact-name"
          label="お名前(必須)"
          className={styles.text}
          placeholder="例:工大太郎"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          required
          id="contact-mail"
          label="メールアドレス(必須)"
          className={styles.text}
          placeholder="例:c1234567@st.kanazawa-it.ac.jp"
          value={mail}
          onChange={e => setMail(e.target.value)}
          error={!!message && message.includes("メールアドレス")}
        />
        <TextField
          required
          id="contact-about"
          label="件名(必須)"
          className={styles.text}
          placeholder="例:○○について"
          value={about}
          onChange={e => setAbout(e.target.value)}
        />
        <TextField
          required
          multiline
          maxRows={10}
          id="contact-main"
          label="お問い合わせ内容(必須)"
          className={styles.text}
          placeholder="お問い合わせ内容をお書きください"
          value={main}
          onChange={e => setMain(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          color="info"
          type="submit"
        >
          入力内容を確認
        </Button>
        {message && (
          <Typography color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Stack>
    </div>
  );
}