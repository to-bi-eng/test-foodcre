"use client";
import { Button, Stack, Typography, Box, CircularProgress } from "@mui/material";
import styles from "@/styles/contactConfirm.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Contact_confirm() {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const data = sessionStorage.getItem("contactData");
    if (data) {
      setContactData(JSON.parse(data));
    } else {
      router.push("/contact");
    }
  }, [router]);

  const handleSend = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/users/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "送信中にエラーが発生しました。");
      }

      sessionStorage.removeItem("contactData");
      router.push("/contact-success-screen"); 

    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.contact_confirm}>
      <Stack
        gap="26px"
        aria-labelledby="contactreview_one"
        className={styles.stack}
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
            bgcolor: "primary.main",
            color: "white",
            flexGrow: 1,
          }}
          className={styles.box}
        >
          <div className={styles.text}>
            <Typography variant="body1" fontSize="1rem" sx={{ padding: 0.5 }}>
              お名前: {contactData.name}
            </Typography>
            <Typography variant="body1" fontSize="1rem" sx={{ padding: 0.5 }}>
              メールアドレス: {contactData.email}
            </Typography>
            <Typography variant="body1" fontSize="1rem" sx={{ padding: 1 }}>
              件名: {contactData.subject}
            </Typography>
            <Typography variant="body1" fontSize="1rem" sx={{ padding: 1, whiteSpace: 'pre-wrap' }}>
              お問い合わせ内容: {contactData.content}
            </Typography>
          </div>
        </Box>
        <Stack direction="row" spacing={8}>
          <Button variant="contained" size="large" color="info" onClick={handleBack} disabled={isLoading}>
            戻る
          </Button>
          <Button
            variant="contained"
            size="large"
            color="info"
            onClick={handleSend}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : '送信'}
          </Button>
        </Stack>
        {message && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {message}
          </Typography>
        )}
      </Stack>
    </div>
  );
}
