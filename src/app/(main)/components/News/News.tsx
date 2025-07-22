"use client";
import React, { useEffect, useState } from "react";
import news_styles from "@/styles/news.module.css";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";

type NewsItem = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

const News = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {

        // /app/api/news/route.tsにデータベースからニュースを取得する処理が書かれています
        // 本番環境にデプロイする際にエンドポイントがたぶん変わるので注意してください
        fetch("/api/news")
            .then((response) => response.json())
            .then((data: NewsItem[]) => {
                setNews(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className={news_styles.news_list_wrapper}>
                <div className={news_styles.news_list}>

                    {/* ローディング中の表示 */}
                    <div className={news_styles.news_loading}>
                        <CircularProgress color="primary" size="3rem" />
                        <p>最新のお知らせを読み込み中...</p>
                    </div>

                    {/* 戻るボタン */}
                    <div className={news_styles.news_button_wrapper}>
                        <Button
                            variant="contained"
                            color="secondary"
                            disableElevation
                            href="/home"
                        >
                            戻る
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!news || news.length === 0) {
        return (
            <div className={news_styles.news_list_wrapper}>
                <div className={news_styles.news_list}>

                    {/* お知らせがないときのメッセージ */}
                    <div className={news_styles.news_loading}>
                        <p>お知らせはありません。</p>
                    </div>

                    {/* 戻るボタン */}
                    <div className={news_styles.news_button_wrapper}>
                        <Button
                            variant="contained"
                            color="secondary"
                            disableElevation
                            href="/home"
                        >
                            戻る
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const totalPages = Math.ceil(news.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedNews = news.slice(startIndex, startIndex + pageSize);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <>
            <div className={news_styles.news_list_wrapper}>
                <div className={news_styles.news_list}>

                    {/* ニュースの表示 */}
                    {paginatedNews.map((item) => (
                        <div className={news_styles.news_item} key={item.id}>
                            <time className={news_styles.news_date}>
                                {new Date(item.created_at).toLocaleDateString("sv-SE")}
                            </time>
                            <div
                                className={news_styles.news_title}
                                dangerouslySetInnerHTML={{ __html: item.title }}
                            />
                        </div>
                    ))}

                    {/* ページネーション */}
                    <div className={news_styles.news_pagenation_wrapper}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChange}
                            color="primary"
                            showFirstButton
                            showLastButton
                        />
                    </div>
                </div>

                {/* 戻るボタン */}
                <div className={news_styles.news_button_wrapper}>
                    <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                        href="/home"
                    >
                        戻る
                    </Button>
                </div>
            </div>
        </>
    );
};

export default News;