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
interface MenuData {
  menu_id: number;
  menu_name: string;
  point_cost: number;
  is_enabled: boolean;
  created_at: string;
}

// ダミーデータ作成関数
const createMenuData = (
  id: number,
  name: string,
  point: number,
  isEnabled: boolean,
  createdAt: string
): MenuData => {
  return { menu_id: id, menu_name: name, point_cost: point, is_enabled: isEnabled, created_at: createdAt };
};

// ダミーデータの配列（menuテーブルのスキーマに合わせて更新）
const rows: MenuData[] = [
  createMenuData(1, 'コーヒー1杯無料券', 100, true, '2025-01-15'),
  createMenuData(2, 'ギョーザ一皿サービス', 250, true, '2025-02-01'),
  createMenuData(3, '【期間限定】特別割引券', 500, false, '2025-05-20'),
  createMenuData(4, 'お好きなラーメン1杯', 800, true, '2025-06-10'),
];

export default function CouponsPage() {
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
            {rows.map((row) => (
              <TableRow hover key={row.menu_id}>
                <TableCell>{row.menu_id}</TableCell>
                <TableCell>{row.menu_name}</TableCell>
                <TableCell align="right">{row.point_cost.toLocaleString()} pt</TableCell>
                <TableCell>
                  <Chip
                    label={row.is_enabled ? '有効' : '無効'}
                    color={row.is_enabled ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.created_at}</TableCell>
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