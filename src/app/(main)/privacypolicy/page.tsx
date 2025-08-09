import styles from '@/styles/privacyPolicy.module.css';
import { Typography, Box } from '@mui/material';

export default function Privacypolicy() {
  return (
    <Box
      className={styles.privacypolicy}
      sx={{ paddingBottom: '90px' }}
    >
      <Box 
        className={styles.box}
      >
        <div className={styles.text}>
          <Typography
            fontSize="2.0rem"
            fontWeight="bold"
          >
            プライバシー
          </Typography>
          <Typography
            fontSize="2.0rem"
            fontWeight="bold"
          >
            ポリシー
          </Typography>
        </div>

        <Box sx={{ mt: 4, mb: 4, textAlign: 'left', width: '100%', maxWidth: '800px' }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            当サービスは、ユーザーの個人情報保護の重要性について認識し、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）を遵守すると共に、以下のプライバシーポリシー（以下「本プライバシーポリシー」といいます。）に従い、適切な取扱い及び保護に努めます。
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            1. 個人情報の定義
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            本プライバシーポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義された個人情報、すなわち、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含みます。）を意味するものとします。
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            2. 個人情報の利用目的
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            当サービスは、お客様の個人情報を、以下の目的で利用いたします。<br />
            (1) 当サービスの提供のため<br />
            (2) 当サービスに関するご案内、お問い合わせ等への対応のため<br />
            (3) 当サービスの商品、サービス等のご案内のため<br />
            (4) 当サービスに関する当社の規約、ポリシー等（以下「規約等」といいます。）に違反する行為に対する対応のため<br />
            (5) 当サービスに関する規約等の変更などを通知するため<br />
            (6) 当サービスの改善、新サービスの開発等に役立てるため
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            3. 個人情報の第三者提供
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            当サービスは、法令で認められる場合を除き、あらかじめユーザーの同意を得ないで、個人情報を第三者に提供しません。
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            4. Cookie（クッキー）その他の技術の利用
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            当サービスのサービスは、Cookie及びこれに類する技術を利用することがあります。これらの技術は、当サービスの利用状況等の把握に役立ち、サービス向上に資するものです。Cookieを無効化されたいユーザーは、ウェブブラウザの設定を変更することによりCookieを無効化することができます。
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            5. プライバシーポリシーの変更
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            当サービスは、必要に応じて、本プライバシーポリシーを変更します。
          </Typography>

          <Typography variant="body2">
            【2025年8月2日 制定】
          </Typography>
        </Box>

      </Box>
    </Box>
  );
}