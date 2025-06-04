import styles from '@/styles/top.module.css';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.page}>
      <Image src="/hachiko.png" alt="8番らーめんロゴ" width="70" height="70" className={styles.logo} />
      <Box mb={6}>
        <Typography
          variant="h6"
          fontSize="1.4rem"
          align="center"
        >
          “8番らーめん”に来店して<br />
          ポイントを貯めて<br />
          お得なクーポンをゲットしよう！
        </Typography>
      </Box>
      <Typography
        variant="h6"
        fontSize='1.3rem'
        align="center"
      >
        このアプリでは、“8番らーめん<br />
        工大前店”でのみポイントの付与、<br />
        クーポンの使用ができます
      </Typography>
      <Box display="flex" justifyContent="flex-end" mt={1}>
        <Image src="/hachiko.png" alt="キャラクター" width="70" height="70" />
      </Box>
      <Box className={styles.news}>
        <Typography
          variant="h3"
          align="center"
        >
          お知らせ
        </Typography>
      </Box>
    </div>
  );
}