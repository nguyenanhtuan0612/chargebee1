// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import CardContent from '@mui/material/CardContent';

// ** Third Party Imports

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { NumericFormat } from 'react-number-format';
import axios from 'axios';
import { Backdrop, CircularProgress } from '@mui/material';
import moment from 'moment';

interface Column {
  id: 'createdAt' | 'amount';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => any;
}

const columns: readonly Column[] = [
  {
    id: 'createdAt',
    label: 'Thời gian',
    minWidth: 170,
    format: value => {
      return moment(new Date(value)).format('HH:mm DD-MM-yyyy');
    }
  },
  {
    id: 'amount',
    label: 'Số tiền',
    minWidth: 100,
    format: value => {
      return <NumericFormat thousandSeparator value={value | 0} displayType={'text'} suffix=' VND' />;
    }
  }
];

interface Data {
  id: number;
  cassoId: number;
  amount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const TabRechargeHistory = () => {
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
      const url = `${process.env.apiUrl}/api/transactions/myPayment?limit=${rowsPerPage}&offset=${offset}`;
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
                      const value: any = row[column.id];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && column.format(value)}
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

export default TabRechargeHistory;
