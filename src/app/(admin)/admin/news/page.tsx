'use client';

import * as React from 'react';
import {
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, IconButton, Toolbar, Chip, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface NewsData {
  news_id: number;
  title: string;
  content: string;
  status: '公開中' | '下書き';
  updated_at: string;
}

// DBのstatus値 <-> 表示用の変換
const statusToDb = (status: '公開中' | '下書き') => (status === '公開中' ? 'public' : 'draft');
const statusFromDb = (status: string) => (status === 'public' ? '公開中' : '下書き');

export default function NewsPage() {
  const [rows, setRows] = React.useState<NewsData[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // ダイアログ用
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newContent, setNewContent] = React.useState('');
  const [newStatus, setNewStatus] = React.useState<'公開中' | '下書き'>('公開中');
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editTargetId, setEditTargetId] = React.useState<number | null>(null);
  const [editTitle, setEditTitle] = React.useState('');
  const [editContent, setEditContent] = React.useState('');
  const [editStatus, setEditStatus] = React.useState<'公開中' | '下書き'>('公開中');

  // ニュース一覧取得
  const fetchNews = async () => {
    const res = await fetch('/api/admin/news');
    const data = await res.json();
    setRows(
      data.map((item: any) => ({
        news_id: item.id,
        title: item.title,
        content: item.content,
        status: statusFromDb(item.status),
        updated_at: item.updated_at?.replace('T', ' ').slice(0, 19) ?? '',
      }))
    );
  };

  React.useEffect(() => {
    fetchNews();
  }, []);

  // 新規作成
  const handleCreate = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    await fetch('/api/admin/news/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
        status: statusToDb(newStatus),
      }),
    });
    setOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewStatus('公開中');
    fetchNews();
  };

  // 編集
  const handleEditClick = (row: NewsData) => {
    setEditTargetId(row.news_id);
    setEditTitle(row.title);
    setEditContent(row.content);
    setEditStatus(row.status);
    setEditDialogOpen(true);
  };
  const handleEditSave = async () => {
    if (!editTargetId) return;
    await fetch(`/api/admin/news/edit?id=${editTargetId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editTitle,
        content: editContent,
        status: statusToDb(editStatus),
      }),
    });
    setEditDialogOpen(false);
    setEditTargetId(null);
    setEditTitle('');
    setEditContent('');
    setEditStatus('公開中');
    fetchNews();
  };

  // 削除
  const handleDeleteClick = (id: number) => {
    setDeleteTargetId(id);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (deleteTargetId !== null) {
      await fetch(`/api/admin/news/delete?id=${deleteTargetId}`, {
        method: 'DELETE',
      });
      setDeleteDialogOpen(false);
      setDeleteTargetId(null);
      fetchNews();
    }
  };
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteTargetId(null);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Toolbar sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          新規作成
        </Button>
      </Toolbar>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 220px)' }}>
        <Table stickyHeader aria-label="news table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '10%' }}>ID</TableCell>
              <TableCell sx={{ width: '60%' }}>タイトル</TableCell>
              <TableCell sx={{ width: '10%' }}>ステータス</TableCell>
              <TableCell sx={{ width: '15%' }}>最終更新日</TableCell>
              <TableCell sx={{ width: '5%' }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.news_id}>
                <TableCell>{row.news_id}</TableCell>
                <TableCell>
                  {row.title.length > 30
                    ? row.title.slice(0, 30) + '…'
                    : row.title}
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === '公開中' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.updated_at}</TableCell>
                <TableCell align="center">
                  <Tooltip title="編集">
                    <IconButton size="small" onClick={() => handleEditClick(row)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="削除">
                    <IconButton size="small" onClick={() => handleDeleteClick(row.news_id)}>
                      <DeleteIcon />
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
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={e => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />

      {/* 削除確認ダイアログ */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>本当に削除しますか？</DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleDeleteCancel} color="inherit">いいえ</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">はい</Button>
        </DialogActions>
      </Dialog>

      {/* 新規作成ダイアログ */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>お知らせ新規作成</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1, minWidth: 300 }}>
            <TextField
              label="タイトル"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="内容"
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              minRows={3}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>ステータス</InputLabel>
              <Select
                value={newStatus}
                label="ステータス"
                onChange={e => setNewStatus(e.target.value as '公開中' | '下書き')}
              >
                <MenuItem value="公開中">公開中</MenuItem>
                <MenuItem value="下書き">下書き</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>キャンセル</Button>
          <Button
            onClick={handleCreate}
            variant="contained"
            color="success"
            disabled={!newTitle.trim() || !newContent.trim()}
          >
            登録
          </Button>
        </DialogActions>
      </Dialog>

      {/* 編集ダイアログ */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>お知らせ編集</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1, minWidth: 300 }}>
            <TextField
              label="タイトル"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="内容"
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              minRows={3}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>ステータス</InputLabel>
              <Select
                value={editStatus}
                label="ステータス"
                onChange={e => setEditStatus(e.target.value as '公開中' | '下書き')}
              >
                <MenuItem value="公開中">公開中</MenuItem>
                <MenuItem value="下書き">下書き</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>キャンセル</Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            color="primary"
            disabled={!editTitle.trim() || !editContent.trim()}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}