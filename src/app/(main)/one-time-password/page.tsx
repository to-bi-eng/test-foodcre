import React, { Suspense } from 'react';
import OneTimePasswordContent from '../components/One-Time-Password/OneTimePasswordContent';
import { Box, CircularProgress } from '@mui/material';

// ローディング中に表示するUI
function Loading() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <CircularProgress />
    </Box>
  );
}

// OneTimePasswordContentを呼び出すだけのシンプルなページ
export default function OneTimePasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <OneTimePasswordContent />
    </Suspense>
  );
}
