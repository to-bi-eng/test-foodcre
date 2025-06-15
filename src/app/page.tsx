"use client";

import styles from '@/styles/top.module.css';
import { Box, Typography, Divider, Link, Button } from '@mui/material';
import Image from 'next/image';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data: news, error, isLoading } = useSWR('/api/news', fetcher);

  return (
    <div className={styles.page}>
      <Box marginLeft="5px">
        <Image src="/hachiko.png" alt="8番らーめんロゴ" width="70" height="70" className={styles.logo} />
      </Box>
      <Box mb={6}>
        <Typography variant="h6" fontSize="1.4rem" align="center">
          “8番らーめん”に来店して<br />
          ポイントを貯めて<br />
          お得なクーポンをゲットしよう！
        </Typography>
      </Box>
      <Typography variant="h6" fontSize='1.3rem' align="center">
        このアプリでは、“8番らーめん<br />
        工大前店”でのみポイントの付与、<br />
        クーポンの使用ができます
      </Typography>
      <Box display="flex" justifyContent="flex-end" mt={1} mr="5px">
        <Image src="/hachiko.png" alt="キャラクター" width="70" height="70" />
      </Box>
      <Box className={styles.news}>
        <Typography variant="h3" align="center">
          お知らせ
        </Typography>
        <Divider sx={{ width: '100%', height: 4, background: '#ff0000', margin: '8px auto', borderRadius: 2 }} />
        <Box
          sx={{
            maxHeight: 400,
            width: '100%',
            overflowY: news && news.length > 5 ? 'auto' : 'visible',
          }}>
          {isLoading && <Typography>読み込み中...</Typography>}
          {error && <Typography color="error">取得に失敗しました</Typography>}
          {news && news.length === 0 && (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
              <Typography align="center" fontSize="1.2rem">
                お知らせはありません
              </Typography>
            </Box>
          )}
          {news && news.length > 0 && news.map((item: any, idx: number) => (
            <Button
              key={item.id}
              variant="text"
              sx={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                color: '#000',
                mb: 3,
                py: 2,
                '&:hover .news-title': {
                  color: 'primary.main',
                },
              }}
              onClick={() => window.location.href = `/news/${item.id}`}
            >
              <Typography variant="subtitle1" sx={{ fontSize: '1rem', color: '#555' }}>
                {item.created_at?.slice(0, 10)}
              </Typography>
              <Typography
                variant="h5"
                className="news-title"
                sx={{
                  whiteSpace: 'pre-line',
                  color: '#000',
                  transition: 'color 0.2s',
                  wordBreak: 'break-word',
                }}
              >
                {item.title}
              </Typography>
              {idx !== news.length - 1 && <Divider sx={{ my: 2 }} />}
            </Button>
          ))}
        </Box>
      </Box>
      <footer className={styles.footer}>
        <Box display="flex" justifyContent="center" gap={3}>
          <Link href="/register">
            <Button variant="contained" color="info" sx={{ fontSize: '1.5rem', px: 4, borderRadius: 3 }}>
              新規登録
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="contained" color="info" sx={{ fontSize: '1.5rem', px: 4, borderRadius: 3 }}>
              ログイン
            </Button>
          </Link>
        </Box>
      </footer>
    </div>
  );
}