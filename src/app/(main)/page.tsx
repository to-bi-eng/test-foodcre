'use client';

import React from 'react';
import { useSession } from "next-auth/react";
import UserStatusCard from '@/app/(main)/components/Top-page/UserStatusCard';
import HomeIcon from '@/app/(main)/components/Top-page/HomeIcon';
import Logout from '@/app/(main)/components/Top-page/Logout';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null; // ローディング中は何も表示しない
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