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
import { FormControl, IconButton, Input, InputAdornment, InputLabel, Menu, MenuItem, Tooltip } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import axios from 'axios';
import { AccountUser } from 'src/@core/models/AccountUser.model';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Link from 'next/link';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'email', label: 'Email', minWidth: 170 },
  {
    id: 'balance',
    label: 'Số tiền',
    minWidth: 170,
    align: 'center'
  },
  { id: 'role', label: 'Vị trí', align: 'right', minWidth: 100 },
  {
    id: 'active',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'actions',
    label: 'Thao tác',
    minWidth: 170,
    align: 'center'
  }
];

const TableManagementAccount = (props: {
  data: AccountUser[];
  trigger: boolean;
  setTrigger: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  row: number;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
}) => {
  // ** States
  const [currentIdClick, setCurrentIdClick] = useState<string>('');
  const { setPage, page, setRowsPerPage, rowsPerPage } = props;

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
    axios
      .put(url, null, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        props.setTrigger(!props.trigger);
      })
      .catch(() => {
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
      case 'email':
        return (
          <TableCell key={id} align={align}>
            <Link href={`/transaction-history/${dataRow.id}`} as={`/transaction-history/${dataRow.id}`}>
              {dataRow[id]}
            </Link>
          </TableCell>
        );
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
            <Tooltip title='Thay đổi vai trò'>
              <IconButton
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClickDropDown(e, dataRow.id)}
              >
                <SupervisorAccountIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Tiền'>
              <IconButton
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClickChangeMoney(e, dataRow.id)}
              >
                <CurrencyExchangeIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        );
      case 'balance': {
        return (
          <TableCell key={id} align={align}>
            {dataRow.balance.toLocaleString('en-Us') + ' VND'}
          </TableCell>
        );
      }
      default:
        return (
          <TableCell key={id} align={align}>
            {dataRow[id]}
          </TableCell>
        );
    }
  };

  // dropdown
  const [anchorElDropDown, setAnchorElDropDown] = useState<null | HTMLElement>(null);
  const openDropDown = Boolean(anchorElDropDown);
  const handleClickDropDown = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setCurrentIdClick(id);
    setAnchorElDropDown(event.currentTarget);
  };

  const handleCloseDropDown = () => {
    setAnchorElDropDown(null);
  };

  const setRole = (role: string) => {
    handleCloseDropDown();
    props.setLoading(true);
    const url = `${process.env.apiUrl}/api/users/changeRole/${currentIdClick}`;
    const token = localStorage.getItem('token');
    const body = {
      role
    };
    axios
      .put(url, body, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => props.setTrigger(!props.trigger))
      .catch(() => props.setLoading(false));
  };

  //change money

  const [anchorElChangeMoney, setAnchorElChangeMoney] = useState<null | HTMLElement>(null);
  const openChangeMoney = Boolean(anchorElChangeMoney);
  const handleClickChangeMoney = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setCurrentIdClick(id);
    setAnchorElChangeMoney(event.currentTarget);
  };

  const handleCloseChangeMoney = () => {
    setAnchorElChangeMoney(null);
  };

  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const money = +e.target.value;
      changeMoney(money);
    }
  };

  const changeMoney = (money: number) => {
    handleCloseChangeMoney();
    props.setLoading(true);
    const url = `${process.env.apiUrl}/api/users/addMoneyToBalance/${currentIdClick}`;
    const token = localStorage.getItem('token');
    const body = {
      money
    };
    axios
      .put(url, body, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => props.setTrigger(!props.trigger))
      .catch(() => props.setLoading(false));
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
            {props.data.map((row: AccountUser) => {
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

      {/* Dropdown change role */}
      <Menu
        id='basic-menu'
        anchorEl={anchorElDropDown}
        open={openDropDown}
        onClose={handleCloseDropDown}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={() => setRole('admin')}>Admin</MenuItem>
        <MenuItem onClick={() => setRole('collaborator')}>Cộng tác viên</MenuItem>
        <MenuItem onClick={() => setRole('customer')}>Khách</MenuItem>
      </Menu>

      {/* Dropdown change money */}

      <Menu
        id='basic-menu'
        anchorEl={anchorElChangeMoney}
        open={openChangeMoney}
        onClose={handleCloseChangeMoney}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem>
          <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
            <InputLabel htmlFor='standard-adornment-amount'>Số tiền</InputLabel>
            <Input
              onKeyPress={onKeyPress}
              id='standard-adornment-amount'
              startAdornment={<InputAdornment position='start'>$</InputAdornment>}
              autoFocus={true}
            />
          </FormControl>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default TableManagementAccount;
