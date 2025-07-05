'use client'; // テーブル操作などクライアント側での対話が必要なため

import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
} from '@mui/material';

// アイコンのインポート
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// 表示用のダミーデータの型定義
interface UserData {
  user_id: number;
  email: string;
  point: number;
  last_login_day: string | null;
  visit_at: string | null;
  created_at: string;
}

// ダミーデータ作成関数
const createData = (
  user_id: number,
  email: string,
  point: number,
  last_login_day: string | null,
  visit_at: string | null,
  created_at: string
): UserData => {
  return { user_id, email, point, last_login_day, visit_at, created_at };
};

// ダミーデータの配列
const rows: UserData[] = [
  createData(1, 'user1@example.com', 1250, '2025-07-04 18:30:00', '2025-07-01 12:05:00', '2024-01-15 10:00:00'),
  createData(2, 'user2@example.com', 300, '2025-06-28 09:15:00', '2025-06-28 09:15:00', '2024-03-22 14:20:00'),
  createData(3, 'user3@example.com', 5800, '2025-07-05 01:15:00', '2025-07-05 01:15:00', '2024-05-10 21:00:00'),
];

export default function UsersPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 220px)' }}> {/* ビューポートに応じた高さを設定 */}
        <Table stickyHeader aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">現在のポイント</TableCell>
              <TableCell>最終ログイン</TableCell>
              <TableCell>最終来店日時</TableCell>
              <TableCell>登録日時</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.user_id}>
                <TableCell>{row.user_id}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align="right">{row.point.toLocaleString()} pt</TableCell>
                <TableCell>{row.last_login_day}</TableCell>
                <TableCell>{row.visit_at}</TableCell>
                <TableCell>{row.created_at}</TableCell>
                <TableCell align="center">
                  <Tooltip title="編集">
                    <IconButton size="small"><EditIcon /></IconButton>
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}