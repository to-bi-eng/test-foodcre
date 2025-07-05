'use client';

import * as React from 'react';
import {
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, IconButton, Toolbar, Chip, Tooltip, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Switch, DialogContentText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// フロントエンドで使うデータの型定義
interface MenuData {
  menu_id: number;
  menu_name: string;
  point_cost: number;
  is_enabled: boolean;
  created_at: string;
  menu_contact?: string;
}

export default function CouponsPage() {
  // --- State管理 ---
  const [rows, setRows] = React.useState<MenuData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // 新規作成ダイアログ用のstate
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [newMenuName, setNewMenuName] = React.useState('');
  const [newMenuContact, setNewMenuContact] = React.useState('');
  const [newPointCost, setNewPointCost] = React.useState('');

  // 編集ダイアログ用のstate
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState<MenuData | null>(null);

  // 削除確認ダイアログ用のstate
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<MenuData | null>(null);

  // --- データ取得 ---
  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/coupons');
      const data = await res.json();
      setRows(data.menus ?? []);
    } catch (error) {
      console.error("Failed to fetch menus:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMenus();
  }, []);

  // --- ハンドラ関数 ---

  // 新規作成ダイアログの処理
  const handleCreateOpen = () => {
    setNewMenuName('');
    setNewMenuContact('');
    setNewPointCost('');
    setOpenCreateDialog(true);
  };
  const handleCreateClose = () => setOpenCreateDialog(false);
  const handleCreateConfirm = async () => {
    const newData = {
      menu_name: newMenuName,
      menu_contact: newMenuContact,
      point_cost: Number(newPointCost),
      is_enabled: true, // 新規作成時は常に有効(true)としてデータを送信
    };
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (!res.ok) throw new Error('Failed to create item');
      handleCreateClose();
      fetchMenus();
    } catch (error) {
      console.error("Creation failed:", error);
    }
  };

  // 編集ダイアログの処理
  const handleEditOpen = (menu: MenuData) => {
    setCurrentItem(menu);
    setOpenEditDialog(true);
  };
  const handleEditClose = () => {
    setOpenEditDialog(false);
    setCurrentItem(null);
  };
  const handleEditSave = async () => {
    if (!currentItem) return;
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentItem),
      });
      if (!res.ok) throw new Error('Failed to update item');
      handleEditClose();
      fetchMenus();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // 削除ダイアログの処理
  const handleDeleteOpen = (menu: MenuData) => {
    setItemToDelete(menu);
    setOpenDeleteDialog(true);
  };
  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setItemToDelete(null);
  };
  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menu_id: itemToDelete.menu_id }),
      });
      if (!res.ok) throw new Error('Failed to delete item');
      handleDeleteClose();
      fetchMenus();
    } catch (error) {
      console.error("Deletion failed:", error);
    }
  };

  // ページネーションの処理
  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Toolbar sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleCreateOpen}>
          新規作成
        </Button>
      </Toolbar>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 220px)' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ maxHeight: 'calc(100vh - 220px)' }}>
          <Table stickyHeader aria-label="coupons table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '10%' }}>ID</TableCell>
                <TableCell sx={{ width: '35%' }}>メニュー名</TableCell>
                <TableCell sx={{ width: '15%' }} align="right">消費ポイント</TableCell>
                <TableCell sx={{ width: '15%' }}>ステータス</TableCell>
                <TableCell sx={{ width: '15%' }}>作成日</TableCell>
                <TableCell sx={{ width: '10%' }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover key={row.menu_id}>
                  <TableCell>{row.menu_id}</TableCell>
                  <TableCell>{row.menu_name}</TableCell>
                  <TableCell align="right">{row.point_cost.toLocaleString()} pt</TableCell>
                  <TableCell>
                    <Chip label="有効" color="success" size="small" />
                  </TableCell>
                  <TableCell>{row.created_at}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="編集">
                      <IconButton size="small" onClick={() => handleEditOpen(row)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="削除">
                      <IconButton size="small" onClick={() => handleDeleteOpen(row)}>
                        <DeleteIcon />
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
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* 新規作成ダイアログ */}
      <Dialog open={openCreateDialog} onClose={handleCreateClose}>
        <DialogTitle>クーポン・メニュー新規作成</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1, minWidth: { xs: 300, md: 500 } }}>
            <TextField label="メニュー名" value={newMenuName} onChange={e => setNewMenuName(e.target.value)} fullWidth margin="normal" required />
            <TextField label="説明文" value={newMenuContact} onChange={e => setNewMenuContact(e.target.value)} fullWidth margin="normal" multiline rows={3} />
            <TextField label="消費ポイント" type="number" value={newPointCost} onChange={e => setNewPointCost(e.target.value)} fullWidth margin="normal" required />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCreateClose}>キャンセル</Button>
          <Button onClick={handleCreateConfirm} variant="contained" color="success" disabled={!newMenuName.trim() || !newPointCost.trim()}>
            登録
          </Button>
        </DialogActions>
      </Dialog>

      {/* 編集ダイアログ */}
      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>クーポン・メニュー編集</DialogTitle>
        <DialogContent>
          {currentItem && (
            <Box component="form" sx={{ mt: 1, minWidth: { xs: 300, md: 500 } }}>
              <TextField
                label="メニュー名"
                value={currentItem.menu_name}
                onChange={e => setCurrentItem({ ...currentItem, menu_name: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="説明文"
                value={currentItem.menu_contact || ''}
                onChange={e => setCurrentItem({ ...currentItem, menu_contact: e.target.value })}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
              <TextField
                label="消費ポイント"
                type="number"
                value={currentItem.point_cost}
                onChange={e => setCurrentItem({ ...currentItem, point_cost: Number(e.target.value) })}
                fullWidth
                margin="normal"
                required
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleEditClose}>キャンセル</Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            color="primary"
            disabled={!currentItem?.menu_name.trim() || currentItem?.point_cost === undefined}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>

      {/* 削除確認ダイアログ */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>削除の確認</DialogTitle>
        <DialogContent>
          <DialogContentText>
            「{itemToDelete?.menu_name}」を本当に削除しますか？<br />
            この操作は元に戻せません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>キャンセル</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}