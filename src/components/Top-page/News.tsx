"use client";
import { Box, Typography, Divider, Button } from "@mui/material";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function News() {
  const { data: news, error, isLoading } = useSWR('/api/news', fetcher);

  return (
    <Box>
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
            onClick={() => window.location.href = `/individual_news/${item.id}`}
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
  );
}