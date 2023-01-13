// ** React Imports
import { useState, ChangeEvent } from 'react';

// ** MUI Imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { AccountTikTok } from 'src/@core/models/AccountTikTok.model';
import { BriefcaseClock } from 'mdi-material-ui';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'email', label: 'Email', minWidth: 170 },
  {
    id: 'balance',
    label: 'Số tiền',
    minWidth: 170,
    align: 'right'
  },
  { id: 'role', label: 'Vị trí', align: 'right', minWidth: 100 },
  {
    id: 'active',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'actions',
    label: 'Thao tác',
    minWidth: 170,
    align: 'right'
  }
];

const TableManagementAccount = (props: { data: AccountTikTok[] }) => {
  // ** States
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDataColumn = (id: string, align: any, dataRow: any) => {
    switch (id) {
      case 'active':
        return (
          <TableCell key={id} align={align}>
            {dataRow[id] ? 'Hoạt động' : 'Không hoạt động'}
          </TableCell>
        );
        break;
      case 'role':
        let title = '';
        if (dataRow[id] == 'customer') {
          title = 'Khách hàng';
        } else if (dataRow[id] == 'admin') {
          title = 'Admin';
        }

        return (
          <TableCell key={id} align={align}>
            {title}
          </TableCell>
        );
        break;
      default:
        return (
          <TableCell key={id} align={align}>
            {dataRow[id]}
          </TableCell>
        );
        break;
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = column.id;

                    return getDataColumn(value, column.align, row);

                    // return (
                    //   <TableCell key={column.id} align={column.align}>
                    //     {row[value]}
                    //   </TableCell>
                    // );
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
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableManagementAccount;
