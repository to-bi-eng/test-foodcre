'use client';

import * as React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, IconButton, Tooltip, Box, Chip, Typography, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, MenuItem, Select
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

type InquiryStatus = '未対応' | '対応中' | '完了';

interface InquiryData {
  id: number;
  email: string;
  title: string;
  content: string;
  status: InquiryStatus;
  receivedAt: string;
  responsedAt: string;
}

const getStatusChipColor = (status: InquiryStatus) => {
  switch (status) {
    case '未対応': return 'error';
    case '対応中': return 'primary';
    case '完了': return 'success';
    default: return 'default';
  }
};

export default function InquiriesPage() {
  const [rows, setRows] = React.useState<InquiryData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // 詳細ダイアログ
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<InquiryData | null>(null);

  // 編集ダイアログ
  const [editId, setEditId] = React.useState<number | null>(null);
  const [editStatus, setEditStatus] = React.useState<InquiryStatus>('未対応');

  const fetchInquiries = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/inquiries');
    const data = await res.json();
    setRows(data.inquiries ?? []);
    setLoading(false);
  };

  React.useEffect(() => { fetchInquiries(); }, []);

  const handleView = (row: InquiryData) => {
    setSelected(row);
    setDialogOpen(true);
  };

  const handleEdit = (row: InquiryData) => {
    setEditId(row.id);
    setEditStatus(row.status);
  };

  const handleEditSave = async () => {
    if (editId == null) return;
    await fetch('/api/admin/inquiries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId, status: editStatus }),
    });
    setEditId(null);
    fetchInquiries();
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" component="h1">お問い合わせ管理</Typography>
      </Box>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 220px)' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>件名</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  {row.title.length > 30
                    ? row.title.slice(0, 30) + '…'
                    : row.title}
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={getStatusChipColor(row.status)}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <IconButton size="small" onClick={() => handleEdit(row)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="詳細を見る">
                    <IconButton size="small" onClick={() => handleView(row)}>
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
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={e => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />

      {/* 詳細ダイアログ */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>お問い合わせ詳細</DialogTitle>
        <DialogContent dividers>
          {selected && (
            <>
              <Typography sx={{ mb: 2, wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                <strong>件名:</strong>
                <br />
                {selected.title}
              </Typography>
              <Typography><strong>Email:</strong> {selected.email}</Typography>
              <Typography><strong>受信日時:</strong> {selected.receivedAt}</Typography>
              <Typography>
                <strong>返信日時:</strong>{' '}
                {selected.status === '完了'
                  ? selected.responsedAt
                  : selected.status}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography>
                  <strong>本文:</strong>
                </Typography>
                <Typography sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word', mt: 1 }}>
                  {selected.content}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>閉じる</Button>
        </DialogActions>
      </Dialog>

      {/* ステータス編集ダイアログ */}
      <Dialog open={editId !== null} onClose={() => setEditId(null)}>
        <DialogTitle>ステータス編集</DialogTitle>
        <DialogContent>
          <Select
            value={editStatus}
            onChange={e => setEditStatus(e.target.value as InquiryStatus)}
            fullWidth
          >
            <MenuItem value="未対応">未対応</MenuItem>
            <MenuItem value="対応中">対応中</MenuItem>
            <MenuItem value="完了">完了</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditId(null)}>キャンセル</Button>
          <Button onClick={handleEditSave} variant="contained">保存</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}