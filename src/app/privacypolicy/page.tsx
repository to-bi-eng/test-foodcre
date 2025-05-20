import styles from '@/styles/privacypolicy.module.css';
import { Typography, Button, Box } from '@mui/material';
// import Link from "next/link";

export default function Privacypolicy() {
    return (
      <div className={ styles.privacypolicy }>
        <Box 
          className={ styles.box }
        >
          <div className= { styles.text }>
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
          <div className={ styles.button }>
            <Button 
              variant="contained" 
              size="large" 
              color="info"
            >
              戻る
            </Button>
            <Button 
              variant="contained" 
              size="large" 
              color="info"
            >
              次へ
            </Button>
          </div>
        </Box>
      </div>
    );
  }