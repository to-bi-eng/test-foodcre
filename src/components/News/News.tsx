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
        <>
            <table className="table">
                <tbody>
                    {news.map(news => (
                        <tr key={news.id}>
                            <td>{news.title}</td>
                            <td>{news.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}