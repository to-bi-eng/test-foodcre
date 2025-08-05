import { notFound } from "next/navigation";
import { Box, Typography, Divider } from "@mui/material";
import styles from "@/styles/individualNews.module.css";
import { getNewsById } from "@/app/services/news"; // データベース関数をインポート

type PageProps = {
  params: {
    id: string;
  };
};

export default async function NewsDetail({ params }: PageProps) {
  const { id } = params;
  
  // fetchの代わりに、データベース関数を直接呼び出す
  const news = await getNewsById(id);

  if (!news) {
    notFound();
  }

  return (
    <Box className={styles.newsContainer}>
      <Typography variant="h4" mb={2} className={styles.linebreak}>
        {news.title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" mb={2}>
        {/* Dateオブジェクトに変換してからフォーマットするとより安全です */}
        {new Date(news.created_at).toLocaleDateString()}
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