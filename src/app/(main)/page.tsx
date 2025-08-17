'use client';

import React from 'react';
import { useSession } from "next-auth/react";
import UserStatusCard from '@/app/(main)/components/Top-page/UserStatusCard';
import HomeIcon from '@/app/(main)/components/Top-page/HomeIcon';
import Logout from '@/app/(main)/components/Top-page/Logout';
import { Box, CircularProgress } from '@mui/material';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return session ? (
    <>
      <UserStatusCard />
      <HomeIcon />
    </>
  ) : (
    <Logout />
  );
}