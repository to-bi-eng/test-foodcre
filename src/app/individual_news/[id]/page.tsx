import { notFound } from "next/navigation";
import { Box, Typography, Divider } from "@mui/material";
import styles from "@/styles/Individual_News.module.css";

type News = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default async function NewsDetail(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/news/${id}`, { cache: "no-store" });
  if (!res.ok) return notFound();

  const news: News | null = await res.json();
  if (!news) return notFound();

  return (
    <Box className={styles.newsContainer}>
      <Typography variant="h4" mb={2} className={styles.linebreak}>
        {news.title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" mb={2}>
        {news.created_at?.slice(0, 10)}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body1" className={styles.linebreak}>
        {news.content}
        <br /><br />
        お知らせに関してご不明な点などがございましたら、下記メールアドレスまでご連絡ください。<br />
        フードクリエイションメールアドレス：kit.foodcreation@gmail.com
      </Typography>
    </Box>
  );
}