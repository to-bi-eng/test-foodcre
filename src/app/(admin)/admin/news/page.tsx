'use client';

import * as React from 'react';
import {
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, IconButton, Toolbar, Chip, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// 表示用のダミーデータの型定義
interface NewsData {
  news_id: number;
  title: string;
  status: '公開中' | '下書き';
  updated_at: string;
}

// ダミーデータ作成関数
const createNewsData = (id: number, title: string, status: '公開中' | '下書き', updatedAt: string): NewsData => {
  return { news_id: id, title, status, updated_at: updatedAt };
};

// ダミーデータの配列（スキーマに合わせて更新）
const rows: NewsData[] = [
  createNewsData(1, '夏休み限定キャンペーンのお知らせ', '公開中', '2025-07-01 10:00:00'),
  createNewsData(2, 'システムメンテナンスのお知らせ（7月10日）', '公開中', '2025-06-25 15:30:00'),
  createNewsData(3, '新機能「〇〇」を追加しました', '下書き', '2025-06-18 11:00:00'),
];

export default function NewsPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // （ページネーションのロジックは省略）

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Toolbar sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          新規作成
        </Button>
      </Toolbar>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 220px)' }}>
        <Table stickyHeader aria-label="news table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '10%' }}>ID</TableCell>
              <TableCell sx={{ width: '40%' }}>タイトル</TableCell>
              <TableCell sx={{ width: '15%' }}>ステータス</TableCell>
              <TableCell sx={{ width: '20%' }}>最終更新日</TableCell> {/* ★ 公開日から変更 */}
              <TableCell sx={{ width: '15%' }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.news_id}>
                <TableCell>{row.news_id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === '公開中' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.updated_at}</TableCell> {/* ★ 表示するデータを変更 */}
                <TableCell align="center">
                  <Tooltip title="編集">
                    <IconButton size="small"><EditIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="削除">
                    <IconButton size="small"><DeleteIcon /></IconButton>
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