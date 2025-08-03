import styles from './error-screen.module.css';

export default function ErrorScreen() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.title}>ポイントアプリ</div>
        <button className={styles['home-button']}>ホーム</button>
      </header>

      <main className={styles.main}>
        <h1 className={styles.heading}>ポイント付与に失敗しました</h1>
        <p className={styles.message}>再度店舗のQRコードを読み取ってください</p>
        <button className={styles['back-button']}>戻る</button>
      </main>

      <footer className={styles.footer}>
        <div>お問い合わせ</div>
        <div>8番ラーメン公式HP</div>
        <div>フードクリエーションHP</div>
        <div className={styles['sns-icons']}>X　Facebook　Instagram　YouTube</div>
        <div>8番らーめん公式SNS｜フードクリエーションSNS</div>
      </footer>
    </>
  );
}
