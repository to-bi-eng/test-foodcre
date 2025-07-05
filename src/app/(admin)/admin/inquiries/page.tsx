'use client';

import * as React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, IconButton, Tooltip, Box, Chip, Typography
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// 表示用のダミーデータの型定義
type InquiryStatus = '未対応' | '対応中' | '完了';

interface InquiryData {
  id: number;
  userName: string;
  userEmail: string;
  subject: string;
  status: InquiryStatus;
  receivedAt: string;
}

// ダミーデータ作成関数
const createInquiryData = (
  id: number,
  userName: string,
  userEmail: string,
  subject: string,
  status: InquiryStatus,
  receivedAt: string
): InquiryData => {
  return { id, userName, userEmail, subject, status, receivedAt };
};

// ダミーデータの配列
const rows: InquiryData[] = [
  createInquiryData(1, 'ユーザーA', 'user_a@example.com', 'ポイントが付与されません', '未対応', '2025-07-05 11:30:00'),
  createInquiryData(2, 'ユーザーB', 'user_b@example.com', '退会方法について', '完了', '2025-07-04 18:00:00'),
  createInquiryData(3, 'ユーザーC', 'user_c@example.com', 'クーポンの使い方がわからない', '対応中', '2025-07-04 15:20:00'),
  createInquiryData(4, 'ユーザーD', 'user_d@example.com', '機能改善の要望', '完了', '2025-07-03 09:10:00'),
  createInquiryData(5, 'ユーザーE', 'user_e@example.com', 'ログインできません', '未対応', '2025-07-05 12:05:00'),
];

// ステータスに応じてチップの色を返すヘルパー関数
const getStatusChipColor = (status: InquiryStatus) => {
  switch (status) {
    case '未対応':
      return 'error'; // 赤色
    case '対応中':
      return 'primary'; // 青色
    case '完了':
      return 'success'; // 緑色
    default:
      return 'default';
  }
};

export default function InquiriesPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // （ページネーションのロジックは省略）

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" component="h1">
          お問い合わせ管理
        </Typography>
      </Box>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 220px)' }}>
        <Table stickyHeader aria-label="inquiries table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '5%' }}>ID</TableCell>
              <TableCell sx={{ width: '20%' }}>受信日時</TableCell>
              <TableCell sx={{ width: '25%' }}>Email</TableCell>
              <TableCell sx={{ width: '30%' }}>件名</TableCell>
              <TableCell sx={{ width: '10%' }}>ステータス</TableCell>
              <TableCell sx={{ width: '10%' }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.receivedAt}</TableCell>
                <TableCell>{row.userEmail}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={getStatusChipColor(row.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="詳細を見る">
                    <IconButton size="small">
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Paper>
  );
}