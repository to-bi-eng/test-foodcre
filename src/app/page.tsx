import React from 'react';
import UserStatusCard from '@/components/Top-page/UserStatusCard';
import HomeIcon from '@/components/Top-page/HomeIcon';
import News from '@/components/Top-page/News';
import Logout from '@/components/Top-page/Logout';

export default function Home() {
  return<>
    <UserStatusCard />
    <HomeIcon />
  </>;
}