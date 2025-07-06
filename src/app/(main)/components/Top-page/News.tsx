"use client";
import { Box, Typography, Divider, Button, CircularProgress } from "@mui/material"; // ★ CircularProgress をインポート
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
          minHeight: 200, // ★ ローディング中などに高さが潰れないように最小の高さを設定
          maxHeight: 400,
          width: '100%',
          overflowY: news && news.length > 5 ? 'auto' : 'visible',
          display: 'flex', // ★ 中央揃えのために追加
          flexDirection: 'column', // ★ 中央揃えのために追加
        }}>

        {/* ★ ローディング状態に応じた表示の切り替え */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <Typography color="error">お知らせの取得に失敗しました</Typography>
          </Box>
        )}
        {!isLoading && !error && (
          <>
            {news && news.length === 0 && (
              <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                <Typography align="center" fontSize="1.2rem">
                  お知らせはありません
                </Typography>
              </Box>
            )}
            {news && news.length > 0 && news.slice(0, 10).map((item: any, idx: number) => (
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
                {idx !== news.slice(0, 10).length - 1 && <Divider sx={{ my: 2 }} />}
              </Button>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}