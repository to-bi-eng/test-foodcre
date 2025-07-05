'use client';

import * as React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, IconButton, Tooltip, Box, Chip, Typography, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Select, MenuItem, FormControl,
  Button // ★★★ Buttonコンポーネントをインポートリストに追加 ★★★
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// --- 型定義 ---
type InquiryStatus = '未対応' | '対応中' | '完了';

interface InquiryData {
  id: number;
  userName: string;
  userEmail: string;
  subject: string;
  status: InquiryStatus;
  receivedAt: string;
}

interface InquiryDetail extends InquiryData {
  content: string;
}

// --- ヘルパー関数 ---
const getStatusChipColor = (status: InquiryStatus): 'error' | 'primary' | 'success' | 'default' => {
  switch (status) {
    case '未対応': return 'error';
    case '対応中': return 'primary';
    case '完了': return 'success';
    default: return 'default';
  }
};

export default function InquiriesPage() {
  // --- State管理 ---
  const [rows, setRows] = React.useState<InquiryData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [selectedInquiry, setSelectedInquiry] = React.useState<InquiryDetail | null>(null);
  const [detailsLoading, setDetailsLoading] = React.useState(false);

  // --- データ取得・更新 ---
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      setRows(data.inquiries ?? []);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchInquiries();
  }, []);

  // --- ハンドラ関数 ---

  const handleStatusChange = async (inquiryId: number, newStatus: InquiryStatus) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiryId, status: newStatus }),
      });
      if (!res.ok) throw new Error('Status update failed');
      fetchInquiries();
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewDetails = async (id: number) => {
    setDetailsOpen(true);
    setDetailsLoading(true);
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`);
      const data = await res.json();
      setSelectedInquiry(data.inquiry);
    } catch (error) {
      console.error("Failed to fetch inquiry details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedInquiry(null);
  };
  
  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
              <TableCell>ID</TableCell>
              <TableCell>受信日時</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>件名</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} align="center"><CircularProgress /></TableCell></TableRow>
            ) : (
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.receivedAt}</TableCell>
                  <TableCell>{row.userEmail}</TableCell>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>
                    <FormControl size="small" fullWidth>
                      <Select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row.id, e.target.value as InquiryStatus)}
                        renderValue={(selected) => (
                          <Chip label={selected} color={getStatusChipColor(selected)} size="small" />
                        )}
                      >
                        <MenuItem value="未対応">未対応</MenuItem>
                        <MenuItem value="対応中">対応中</MenuItem>
                        <MenuItem value="完了">完了</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="詳細を見る">
                      <IconButton size="small" onClick={() => handleViewDetails(row.id)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
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

      <Dialog open={detailsOpen} onClose={handleDetailsClose} fullWidth maxWidth="md">
        <DialogTitle>お問い合わせ詳細</DialogTitle>
        <DialogContent dividers>
          {detailsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
          ) : selectedInquiry ? (
            <Box>
              <Typography gutterBottom><strong>件名:</strong> {selectedInquiry.subject}</Typography>
              <Typography gutterBottom><strong>日時:</strong> {selectedInquiry.receivedAt}</Typography>
              <Typography gutterBottom><strong>お名前:</strong> {selectedInquiry.userName}</Typography>
              <Typography gutterBottom><strong>Email:</strong> {selectedInquiry.userEmail}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{selectedInquiry.content}</Typography>
            </Box>
          ) : (
            <Typography>詳細を読み込めませんでした。</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}