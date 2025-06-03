import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

// BEが出来たら、ユーザー情報を取得して表示するようにしてください。
// 現状は、propsで受け取った値を表示するだけです。
type UserCardProps = {
    name: string;
    points: number;
    coupons: number;
};

export default function UserStatusCard({ name, points, coupons }: UserCardProps) {
    return (
        <Card
            sx={{
                maxWidth: 380,
                margin: '16px auto',
                backgroundColor: '#4b4b4b',
                color: '#fff',
                borderRadius: 2,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            }}
        >
            <CardContent>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 'bold', marginBottom: 2, marginLeft: 2 }}
                >
                    {name}さん
                </Typography>
                <Box sx={{ marginY: 2, marginX: 5 }}>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        現在の所有ポイント：
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            marginBottom: 2,
                            textAlign: 'right',
                        }}
                    >
                        {points}ポイント
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        所持クーポン枚数：
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'right',
                        }}
                    >
                        {coupons}枚
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
