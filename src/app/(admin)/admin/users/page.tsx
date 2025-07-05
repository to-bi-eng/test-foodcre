'use client';

import * as React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, IconButton, Tooltip, Box, TextField, Button, CircularProgress // ★ CircularProgress をインポート
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
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const fetchUsers = async (emailQuery = '') => {
    setLoading(true); // ★ データ取得開始前にローディング中にする
    try {
      const url = `/api/admin/users?email=${encodeURIComponent(emailQuery)}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      setRows(data.users ?? []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setRows([]); // エラー時はデータを空にする
    } finally {
      setLoading(false); // ★ 成功・失敗問わず、処理完了後にローディングを解除
    }
  };

  // 初回ロード時に全ユーザーを取得
  React.useEffect(() => {
    fetchUsers();
  }, []);

  // 検索ボタンのクリック処理
  const handleSearch = () => {
    setPage(0); // 検索時は1ページ目に戻す
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
          disabled={loading} // ★ ローディング中はボタンを無効化
        >
          検索
        </Button>
      </Box>

      {/* ★ ローディング状態に応じて表示を切り替え */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 280px)' }}>
          <CircularProgress />
        </Box>
      ) : (
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
      )}

      <TablePagination
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