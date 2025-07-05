'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

// アイコンのインポート
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ContactMailIcon from '@mui/icons-material/ContactMail'; // ← 1. お問い合わせ用のアイコンをインポート

const drawerWidth = 240;

const menuItems = [
  { text: 'アカウント一覧', href: '/admin/users', icon: <PeopleIcon /> },
  { text: 'お知らせ一覧', href: '/admin/news', icon: <CampaignIcon /> },
  { text: 'クーポン一覧', href: '/admin/coupons', icon: <ConfirmationNumberIcon /> },
  { text: '来店QRコード', href: '/admin/check-in-qr', icon: <QrCode2Icon /> },
  { text: 'お問い合わせ一覧', href: '/admin/inquiries', icon: <ContactMailIcon /> }, // ← 2. 新しいメニュー項目を追加
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            ポイントアプリ管理者画面
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
            <Typography variant="body1">
              admin@example.com
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    sx={{
                      ...(isActive && {
                        backgroundColor: 'primary.main',
                        color: 'common.white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'common.white',
                        },
                      }),
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f0f2f5' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}