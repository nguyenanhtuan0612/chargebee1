// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import CardContent from '@mui/material/CardContent';

// ** Third Party Imports

import { Backdrop, CircularProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import moment from 'moment';

interface Column {
  id: 'username' | 'password' | 'tiktokCoin' | 'price' | 'createdAt';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: any) => any;
}

const columns: readonly Column[] = [
  { id: 'username', label: 'Email đăng nhập', minWidth: 170 },
  { id: 'password', label: 'Mật khẩu', minWidth: 140, align: 'center' },
  {
    id: 'tiktokCoin',
    label: 'Số xu',
    minWidth: 120,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'price',
    label: 'Giá mua',
    minWidth: 120,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US') + ' VND'
  },
  {
    id: 'createdAt',
    label: 'Thời gian',
    minWidth: 170,
    align: 'right',
    format: value => {
      return moment(new Date(value)).format('HH:mm DD-MM-yyyy');
    }
  }
];

interface Data {
  id: number;
  userId: string;
  tiktokAccountId: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  tiktokAccount: {
    id: string;
    username: string;
    password: string;
    tiktokCoin: string;
  };
}

const TabTransaction = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Data[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const offset = page * rowsPerPage;
      const url = `${process.env.apiUrl}/api/transactions/myTransaction?limit=${rowsPerPage}&offset=${offset}`;
      const token = localStorage.getItem('token');
      const res = await axios.get(url, { headers: { authorization: 'Bearer ' + token } });
      const dataRows: Data[] = res.data.rows;
      setRows(dataRows);
      handleCloseLoading();
    }

    fetch();
  }, [page, rowsPerPage]);

  return (
    <>
      {' '}
      <CardContent>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                    {columns.map(column => {
                      let value;
                      switch (column.id) {
                        case 'username':
                          value = row.tiktokAccount.username;
                          break;
                        case 'password':
                          value = row.tiktokAccount.password;
                          break;
                        case 'tiktokCoin':
                          value = row.tiktokAccount.tiktokCoin;
                          break;
                        default:
                          value = row[column.id];
                          break;
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

export default TabTransaction;
