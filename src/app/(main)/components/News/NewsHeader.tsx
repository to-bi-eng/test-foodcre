import news_styles from "@/styles/News.module.css"
import Image from "next/image";
import hachiko_icon from "/public/hachiko.png";

export default function NewsHeader() {
    return (
        <>

            <div className={news_styles.news_header}>
                <div className={news_styles.news_header_inner}>
                    <Image
                        src={hachiko_icon}
                        alt="Hachiko Icon"
                        height={50}
                    />
                    <h1 className={news_styles.news_title}>お知らせ</h1>
                </div>
            </div>
        </>
    );
}