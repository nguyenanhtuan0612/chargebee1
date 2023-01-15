// ** React Imports
import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';

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
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'username', label: 'Email', minWidth: 170 },
  { id: 'price', label: 'Giá', minWidth: 100 },
  {
    id: 'tiktokCoin',
    label: 'Xu tiktok',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'ownedBy',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'actions',
    label: 'Thao tác',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2)
  }
];

const TableManagementTikTok = (props: {
  data: AccountTikTok[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
  count: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setTrigger: Dispatch<SetStateAction<boolean>>;
  trigger: boolean;
}) => {
  // ** States
  const { setPage, page, setRowsPerPage, rowsPerPage, count } = props;
  const [currentIdClick, setCurrentIdClick] = useState<string>('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDataColumn = (id: string, align: any, dataRow: any) => {
    switch (id) {
      case 'ownedBy':
        return (
          <TableCell key={id} align={align}>
            {dataRow[id] ? 'Đã bán' : 'Chưa bán'}
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
        return (
          <TableCell key={id} align={align}>
            <Tooltip title={'Xoá'}>
              <IconButton
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClickDropDown(e, dataRow.id)}
              >
                {<DeleteIcon />}
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

  //dropdown
  const [anchorElDropDown, setAnchorElDropDown] = useState<null | HTMLElement>(null);
  const openDropDown = Boolean(anchorElDropDown);
  const handleClickDropDown = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setCurrentIdClick(id);
    setAnchorElDropDown(event.currentTarget);
  };

  const handleCloseDropDown = () => {
    setAnchorElDropDown(null);
  };

  const deleteAccount = () => {
    // console.log(currentIdClick);

    handleCloseDropDown();
    props.setLoading(true);
    const url = `http://localhost:5001/api/tiktokAccount/delete/${currentIdClick}`;
    const token = localStorage.getItem('token');
    axios
      .delete(url, {
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
            {props.data.map((row: any) => {
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
        count={count}
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
        <MenuItem onClick={() => deleteAccount()}>Xác nhận</MenuItem>
        <MenuItem onClick={handleCloseDropDown}>Huỷ</MenuItem>
      </Menu>
    </Paper>
  );
};

export default TableManagementTikTok;
