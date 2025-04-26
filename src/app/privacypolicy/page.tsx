export default function Privacypolicy() {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', backgroundColor: '#fff', height: '115vh', display: 'flex', flexDirection: 'column'}}>
        <h1 style={{ padding: '20px 0px'}}>
            プライバシー<br />
            ポリシー
        </h1>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  gap: '100px'}}>
            <button style={{ padding: '20px 30px', backgroundColor: '#4B4B4B', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>戻る</button>
            <button style={{ padding: '20px 30px', backgroundColor: '#4B4B4B', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>次へ</button>
        </div>
      </div>
    );
  }