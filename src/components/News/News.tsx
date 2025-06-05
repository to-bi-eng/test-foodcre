import news_styles from "@/styles/News.module.css"
import Button from '@mui/material/Button';
type News = {
    id: number,
    title: string,
    content: string,
    created_at: string,
}

export default async function News() {
    const response = await fetch('http://localhost:3000/api/news');
    const news: News[] = await response.json();
    if (!news || news.length === 0) {
        return <p>新しいお知らせはありません。</p>;
    }
    return (
        <div className={news_styles.news_list_wrapper}>
            <div className={news_styles.news_list}>
                {news.map((item) => (
                    <div className={news_styles.news_item} key={item.id}>
                        <time className={news_styles.news_date}>{new Date(item.created_at).toLocaleDateString('sv-SE')}</time>
                        <div
                            className={news_styles.news_title}
                            dangerouslySetInnerHTML={{
                                __html: `${item.title}`,
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className={news_styles.news_button_wrapper}>
                <Button variant="contained" color="secondary" disableElevation href="/home">戻る</Button>
            </div>
        </div>
    )
}