"use client";
import * as React from 'react';
import { 
    AppBar, Box, Toolbar, Typography, Stack, IconButton, 
    Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider 
} from '@mui/material';
import Link from 'next/link';
import styles from '@/styles/header.module.css';

// アイコンをインポート
import MenuIcon from '@mui/icons-material/Menu';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockResetIcon from '@mui/icons-material/LockReset';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';


export default function Header() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const router = useRouter();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
             (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        // ここに実際のログアウト処理を記述しろ
        console.log("ログアウト処理を実行");
        setDrawerOpen(false);
        router.push('/'); // 仮でトップに遷移
    };

    const menuItems = [
        { text: 'お問い合わせ', icon: <MailOutlineIcon />, path: '/contact' },
        { text: 'パスワード変更', icon: <LockResetIcon />, path: '/passwordedit' },
        { text: 'お知らせ', icon: <NotificationsNoneIcon />, path: '/news' },
        { text: 'プライバシーポリシー', icon: <PolicyOutlinedIcon />, path: '/privacypolicy' },
    ];

    const drawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} href={item.path}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="ログアウト" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{
            flexGrow: 1,
            position: "fixed",
            inset: 0,
            top: 0,
            bottom: "auto",
            zIndex: 1,
        }} className={styles.box}>
            <AppBar position="sticky" color="primary" className={styles.header}>
                <Toolbar sx={{ paddingLeft: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
                        <IconButton
                            color="inherit"
                            size="large"
                            component={Link}
                            href="/"
                        >
                            <img src="/logo.png" alt="ロゴ" style={{ height: '30px' }} />
                        </IconButton>
                        <Typography variant="h6" component="div">
                            はちぽ
                        </Typography>
                    </Stack>
                    
                    {/* ハンバーガーメニューアイコン */}
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            
            {/* ドロワー（メニュー本体） */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawerList}
            </Drawer>
        </Box>
    );
}
