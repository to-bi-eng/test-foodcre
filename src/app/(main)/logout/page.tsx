import styles from '@/styles/logout.module.css';
import { Typography, Button, Box } from '@mui/material';
import Link from "next/link";
import Image from 'next/image';

export default function LogoutScreen()  {
  return (
    <div className={ styles.page }>
      <Box 
        component="section"
        gap="26px"
        aria-labelledby="logout"
        className={ styles.box }
        >
        <Image src="/Hachiko.png" alt="ハチコのイラスト" width="180" height="150"/>
        <Typography
          id="logout"
          variant="h2"
          fontSize="2.0rem"
          fontWeight="bold"
        >
          ログアウトしました
        </Typography>
        <Link href="/" passHref>
          <Button variant="contained" size="large" color="info">OK</Button>
        </Link> 
      </Box> 
    </div>
  );
};