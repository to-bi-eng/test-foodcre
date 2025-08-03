import React, { Suspense } from 'react';
import PointEndContent from './PointEndContent';
import { CircularProgress, Box } from '@mui/material';

// ローディング中に表示するコンポーネント
function LoadingFallback() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
}

export default function PointEndPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PointEndContent />
    </Suspense>
  );
}