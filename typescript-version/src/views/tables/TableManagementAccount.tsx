// ** React Imports
import { useState, ChangeEvent, SetStateAction, Dispatch } from 'react';

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
import { IconButton, Tooltip } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import axios from 'axios';
import { AccountUser } from 'src/@core/models/AccountUser.model';

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

const TableManagementAccount = (props: {
  data: AccountUser[];
  trigger: boolean;
  setTrigger: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  row: number;
}) => {
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

  const banAccount = (state: boolean, dataRow: AccountUser): void => {
    props.setLoading(true);
    let url = `${process.env.apiUrl}/api/`;
    if (state) {
      url = url + `users/ban/${dataRow.id}`;
    } else {
      url = url + `users/unBan/${dataRow.id}`;
    }
    const token = localStorage.getItem('token');
    const data = axios
      .put(url, null, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        props.setTrigger(!props.trigger);
      })
      .catch(err => {
        props.setLoading(false);
        console.log;
      });
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
        } else if (dataRow[id] == 'collaborator') {
          title = 'Cộng tác viên';
        }

        return (
          <TableCell key={id} align={align}>
            {title}
          </TableCell>
        );
        break;
      case 'actions':
        const state = dataRow.active;

        return (
          <TableCell key={id} align={align}>
            <Tooltip title={state ? 'Khoá' : 'Mở'}>
              {state ? (
                <IconButton
                  onClick={() => {
                    banAccount(state, dataRow);
                  }}
                >
                  {<LockOutlinedIcon />}
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    banAccount(state, dataRow);
                  }}
                >
                  {<LockOpenOutlinedIcon />}
                </IconButton>
              )}
            </Tooltip>
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
        count={props.row}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableManagementAccount;
