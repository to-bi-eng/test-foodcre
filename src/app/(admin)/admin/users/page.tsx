'use client';

import * as React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, IconButton, Tooltip, Box, TextField, Button, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Divider, Typography
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
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [searchTerm, setSearchTerm] = React.useState('');

  const [editOpen, setEditOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<UserData | null>(null);
  const [newPointValue, setNewPointValue] = React.useState('');

  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);

  const fetchUsers = async (emailQuery = '') => {
    setLoading(true);
    try {
      const url = `/api/admin/users?email=${encodeURIComponent(emailQuery)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setRows(data.users ?? []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    setPage(0);
    fetchUsers(searchTerm);
  };

  const handleEditOpen = (user: UserData) => {
    setCurrentUser(user);
    setNewPointValue(String(user.point));
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setCurrentUser(null);
  };
  const handleEditSave = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentUser.id, point: Number(newPointValue) }),
      });
      if (!res.ok) throw new Error('Failed to update user');
      handleEditClose();
      fetchUsers();
    } catch (error) { console.error("Update failed:", error); }
  };

  const handleDeleteClick = () => {
    setEditOpen(false);
    setConfirmDeleteOpen(true);
  };
  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false);
    setEditOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentUser.id }),
      });
      if (!res.ok) throw new Error('Failed to delete user');
      setConfirmDeleteOpen(false);
      setCurrentUser(null);
      fetchUsers();
    } catch (error) { console.error("Deletion failed:", error); }
  };

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
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
          disabled={loading}
        >
          検索
        </Button>
      </Box>

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
                      {/* ★★★ ここにonClickイベントを追加しました ★★★ */}
                      <IconButton size="small" onClick={() => handleEditOpen(row)}>
                        <EditIcon />
                      </IconButton>
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

      {/* 編集ダイアログ */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>アカウント編集: {currentUser?.email}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1, minWidth: { xs: 300, md: 400 } }}>
            <TextField
              label="現在のポイント"
              type="number"
              value={newPointValue}
              onChange={e => setNewPointValue(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" color="error" gutterBottom>
            危険な操作
          </Typography>
          <Button variant="outlined" color="error" onClick={handleDeleteClick}>
            このアカウントを削除する
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>キャンセル</Button>
          <Button onClick={handleEditSave} variant="contained" disabled={!newPointValue}>
            保存
          </Button>
        </DialogActions>
      </Dialog>

      {/* 削除確認ダイアログ */}
      <Dialog open={confirmDeleteOpen} onClose={handleConfirmDeleteClose}>
        <DialogTitle>アカウント削除の最終確認</DialogTitle>
        <DialogContent>
          <DialogContentText>
            本当に「{currentUser?.email}」を削除しますか？<br />
            この操作は元に戻すことができず、関連するすべてのデータが失われます。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeleteClose}>キャンセル</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            削除を実行する
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}