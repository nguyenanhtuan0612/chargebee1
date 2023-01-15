// ** MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

// ** Demo Components Imports
import {
  alpha,
  Backdrop,
  Button,
  CircularProgress,
  DialogContent,
  InputAdornment,
  Menu,
  MenuItem,
  MenuProps,
  Modal,
  Snackbar,
  SnackbarOrigin,
  Stack,
  styled,
  TextField
} from '@mui/material';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import FormAddAccountUser from 'src/views/form-layouts/FormAddAccountUser';
import TableManagementAccount from 'src/views/tables/TableManagementAccount';
import { AccountUser } from 'src/@core/models/AccountUser.model';
import Magnify from 'mdi-material-ui/Magnify';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

export interface StateToast extends SnackbarOrigin {
  openToast: boolean;
  message?: string;
}

const ManagementAccounts = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [row, setRow] = useState<number>(0);
  const [listAccounts, setlistAccounts] = useState<Array<AccountUser>>([]);
  const [trigger, setTrigger] = useState<boolean>(false);

  // state statePagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortMoney, setSortMoney] = useState('DESC');
  const [searchEmail, setSearchEmail] = useState<string>('');

  //setting toast
  const [stateToast, setStateToast] = useState<StateToast>({
    openToast: false,
    vertical: 'top',
    horizontal: 'right'
  });

  const { vertical, horizontal, openToast } = stateToast;

  const handleOpenToast = (message: string) => {
    setStateToast({ ...stateToast, openToast: true, message: message });
    handleCloseToast();
  };

  const handleCloseToast = () => {
    setTimeout(() => {
      setStateToast({ ...stateToast, openToast: false });
    }, 1000);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = (email?: string) => {
    setLoading(true);
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6IjRkMzU2MDdhLWFjYWEtNDc3NS05OGVhLTliMWRkYTVlYjg3MCIsImlhdCI6MTY3MzA2Mjg5OCwiZXhwIjoxNzA0NTk4ODk4fQ.hjnpzFJWG52YXKhX_n_bm1TYH5z77k6wC3_NNcR5Ii8';
    const url = 'http://localhost:5001/api/users';
    let params = {};
    if (email) {
      const filter = JSON.stringify([{ operator: 'iLike', value: `${email}`, prop: 'email' }]);
      debugger;
      params = {
        limit: rowsPerPage,
        offset: page,
        filter
      };
    } else {
      params = {
        limit: rowsPerPage,
        offset: page
      };
    }
    debugger;
    const data = axios
      .get(url, {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setLoading(false);
        setlistAccounts(res.data.rows);
        setRow(res.data.count);
      })
      .catch(err => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [trigger]);

  const addSuccess = (isSuccess: boolean) => {
    if (isSuccess) {
      handleClose();
      handleOpenToast('Thêm tài khoản thành công');
    } else {
      handleClose();
      handleOpenToast('Thêm tài khoản thất bại');
    }
  };

  const searchUser = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const textSearch = e.target.value;
      fetchData(textSearch);
      e.target.value = '';
    }
  };

  // state menu sort

  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0'
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5)
        },
        '&:active': {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
        }
      }
    }
  }));

  const [anchorElSortBalance, setAnchorElSortBalance] = useState<null | HTMLElement>(null);
  const openSortBalance = Boolean(anchorElSortBalance);
  const handleClickSortBalance = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSortBalance(event.currentTarget);
  };
  const handleCloseSortBalance = () => {
    setAnchorElSortBalance(null);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Quản lý tài khoản' titleTypographyProps={{ variant: 'h6' }} />
          <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} mb={4.5} mx={4}>
            <Stack direction='row' spacing={2}>
              <TextField
                onKeyPress={searchUser}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchEmail(e.target.value)}
                size='small'
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Magnify fontSize='small' />
                    </InputAdornment>
                  )
                }}
              />
              <Button
                id='demo-customized-button'
                aria-controls={openSortBalance ? 'demo-customized-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={openSortBalance ? 'true' : undefined}
                variant='contained'
                disableElevation
                onClick={handleClickSortBalance}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Sắp xếp giá
              </Button>
              <StyledMenu
                id='demo-customized-menu'
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button'
                }}
                anchorEl={anchorElSortBalance}
                open={openSortBalance}
                onClose={handleCloseSortBalance}
              >
                <MenuItem onClick={handleCloseSortBalance} disableRipple>
                  Giá tăng dần
                </MenuItem>
                <MenuItem onClick={handleCloseSortBalance} disableRipple>
                  Giá giảm dần
                </MenuItem>
              </StyledMenu>
            </Stack>
            <Button variant='contained' onClick={handleOpen}>
              Thêm tài khoản
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='parent-modal-title'
              aria-describedby='parent-modal-description'
            >
              <DialogContent sx={style}>
                <FormAddAccountUser addSuccess={addSuccess} trigger={trigger} setTrigger={setTrigger} />
              </DialogContent>
            </Modal>
          </Stack>
          <TableManagementAccount
            data={listAccounts}
            row={row}
            trigger={trigger}
            setTrigger={setTrigger}
            setLoading={setLoading}
          />
        </Card>
      </Grid>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading} onClick={handleClose}>
        <CircularProgress color='inherit' />
      </Backdrop>

      {/* toast */}

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openToast}
        onClose={handleCloseToast}
        message={stateToast.message}
        key={vertical + horizontal}
      />

      {/* Giá tăng dần và giảm dần */}
    </Grid>
  );
};

export default ManagementAccounts;
