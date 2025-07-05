'use client';

import * as React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, IconButton, Tooltip, Box, TextField, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

interface UserData {
  id: number;
  email: string;
  point: number;
  last_login_day: string | null;
  visit_at: string | null;
  created_at: string;
}

export default function UsersPage() {
  const [rows, setRows] = React.useState<UserData[]>([]);
  const [page, setPage] = React.useState(0);
  // ★ 1ページの表示件数の初期値を30に変更
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  // ★ 検索キーワードを保持するためのstateを追加
  const [searchTerm, setSearchTerm] = React.useState('');

  // データを取得する関数
  const fetchUsers = (emailQuery = '') => {
    // emailクエリがある場合はURLに追加
    const url = `/api/admin/users?email=${encodeURIComponent(emailQuery)}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setRows(data.users ?? []));
  };

  // 初回ロード時に全ユーザーを取得
  React.useEffect(() => {
    fetchUsers();
  }, []);

  // 検索ボタンのクリック処理
  const handleSearch = () => {
    fetchUsers(searchTerm);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* ★ 検索フォームを追加 */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          label="メールアドレスで検索"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          検索
        </Button>
      </Box>

      <TableContainer sx={{ maxHeight: 'calc(100vh - 280px)' }}>
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
              <TableRow hover key={row.id}>
                <TableCell>{row.id}</TableCell>
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
        // ★ ページネーションの選択肢に30を追加
        rowsPerPageOptions={[10, 30, 50, 100]}
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