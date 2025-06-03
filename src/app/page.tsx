import React from 'react';
import UserCard from '@/components/UserStatusCard/UserStatusCard';

export default function Home() {
  return (
    <>
      <UserCard name="太郎" points={1234} coupons={5} />
    </>
  );
}
