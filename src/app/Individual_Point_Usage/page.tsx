import styles from '@/styles/PointUsage.module.css';
import { Typography, Button } from '@mui/material';
// import Link from "next/link";

export default function Privacypolicy() {
    return (
      <div>
        <Typography>
          餃子6個
        </Typography>
        <Typography>
          5％off
        </Typography>
        <Typography>
          〇ポイントと引き換えます
        </Typography>
        <Typography>
          有効期限は引き換えてから
        </Typography>
        <Typography>
          〇ケ月後です
        </Typography>
        <Button>
          クーポンに引き換える
        </Button>
        <Button>
          戻る
        </Button>
      </div>
    );
  }