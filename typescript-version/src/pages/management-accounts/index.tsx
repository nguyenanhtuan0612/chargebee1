// ** MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

// ** Demo Components Imports
import {
  Backdrop,
  Button,
  CircularProgress,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  SnackbarOrigin,
  Stack,
  TextField
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AccountUser } from 'src/@core/models/AccountUser.model';
import FormAddAccountUser from 'src/views/form-layouts/FormAddAccountUser';
import TableManagementAccount from 'src/views/tables/TableManagementAccount';

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
  const [sortMoney, setSortMoney] = useState('desc');
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

  useEffect(() => {
    setLoading(true);
    const url = `${process.env.apiUrl}/api/users`;
    const token = localStorage.getItem('token');
    let params = {};

    if (searchEmail) {
      const filter = JSON.stringify([{ operator: 'iLike', value: `${searchEmail}`, prop: 'email' }]);
      params = {
        limit: rowsPerPage,
        offset: page,
        filter,
        order: JSON.stringify([{ direction: sortMoney, prop: 'balance' }])
      };
    } else {
      params = {
        limit: rowsPerPage,
        offset: page,
        order: JSON.stringify([{ direction: sortMoney, prop: 'balance' }])
      };
    }

    axios
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
      .catch(() => {
        setLoading(false);
      });
  }, [trigger, page, rowsPerPage]);

  const addSuccess = (isSuccess: boolean) => {
    if (isSuccess) {
      handleClose();
      handleOpenToast('Thêm tài khoản thành công');
    } else {
      handleClose();
      handleOpenToast('Thêm tài khoản thất bại');
    }
  };

  // state menu sort

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Quản lý tài khoản' titleTypographyProps={{ variant: 'h6' }} />
          <Stack
            justifyContent='space-between'
            alignItems={{ lg: 'center' }}
            spacing={2}
            mb={4.5}
            mx={4}
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                fullWidth
                type='role'
                size='small'
                label='Email'
                value={searchEmail}
                onChange={e => setSearchEmail(e.target.value)}
              />
              <FormControl size='small' sx={{ width: { md: 250 } }}>
                <InputLabel id='demo-simple-select-label'>Số tiền</InputLabel>
                <Select value={sortMoney} label='Số tiền' onChange={e => setSortMoney(e.target.value)}>
                  <MenuItem value={'desc'}>Giảm dần</MenuItem>
                  <MenuItem value={'asc'}>Tăng dần</MenuItem>
                </Select>
              </FormControl>
              <Button variant='contained' onClick={() => setTrigger(!trigger)}>
                Lọc
              </Button>
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
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
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
