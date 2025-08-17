import React, { Suspense } from 'react';
import PointsToCouponsContent from './PointsToCouponsContent';
import { Box, CircularProgress } from '@mui/material';

// ローディング中に表示するUI
function Loading() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <CircularProgress />
    </Box>
  );
}

export default function PointsToCouponsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PointsToCouponsContent />
    </Suspense>
  );
}