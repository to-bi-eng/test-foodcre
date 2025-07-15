import React from 'react';

import UserStatusCard from '@/app/(main)/components/Top-page/UserStatusCard';

import HomeIcon from '@/app/(main)/components/Top-page/HomeIcon';
import News from '@/app/(main)/components/News/News';
import Logout from '@/app/(main)/components/Top-page/Logout';

export default function Home() {
  return<>
    <UserStatusCard />
    <HomeIcon />
    <News/>
    <Logout/>
  </>;
}