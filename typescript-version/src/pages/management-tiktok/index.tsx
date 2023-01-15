// ** MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

// ** Demo Components Imports
import { Backdrop, Button, CircularProgress, DialogContent, Modal, Snackbar, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AccountTikTok } from 'src/@core/models/AccountTikTok.model';
import FormAddAccountTikTok from 'src/views/form-layouts/FormAddAccountTikTok';
import TableManagementTikTok from 'src/views/tables/TableManagementTikTok';
import { StateToast } from '../management-accounts';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400
};

const ManagementTikTok = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [listAccounts, setlistAccounts] = useState<Array<AccountTikTok>>([]);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [count, setCount] = useState(0);
  const [exchangeRate, setExchangRate] = useState(0);

  // state statePagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const importExcel = (e: any) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const url = `${process.env.apiUrl}/api/tiktokAccount/importTiktokAccountCoin`;
    const token = localStorage.getItem('token');
    const header = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    };
    axios
      .post(url, formData, header)
      .then(() => setTrigger(!trigger))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const url = `${process.env.apiUrl}/api/configs`;
      const res = await axios.get(url);
      setExchangRate(res.data.exchangeRate);
    }

    fetch();

    const offset = rowsPerPage * page;
    const token = localStorage.getItem('token');
    const url = `${process.env.apiUrl}/api/tiktokAccount/listTiktokAccountCoinForAdmin?limit=${rowsPerPage}&offset=${offset}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setLoading(false);
        setlistAccounts(res.data.rows);
        setCount(res.data.count);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [trigger, page, rowsPerPage]);

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

  //end setting toast

  const addSuccess = (isSuccess: boolean) => {
    if (isSuccess) {
      handleClose();
      handleOpenToast('Thêm tài khoản thành công');
    } else {
      handleClose();
      handleOpenToast('Thêm tài khoản thất bại');
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Danh sách tài khoản tiktok' titleTypographyProps={{ variant: 'h6' }} />
          <Stack direction='row' justifyContent='flex-end' alignItems='flex-start' spacing={2} mb={4.5} mr={2}>
            <Button variant='outlined' onClick={handleOpen}>
              Thêm tài khoản
            </Button>
            <Button variant='contained' component='label'>
              Nhập excel
              <input
                hidden
                type='file'
                accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                onChange={importExcel}
              />
            </Button>
          </Stack>
          <TableManagementTikTok
            data={listAccounts}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            count={count}
            trigger={trigger}
            setTrigger={setTrigger}
            setLoading={setLoading}
            exchangeRate={exchangeRate}
          />
        </Card>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <DialogContent sx={style}>
          <FormAddAccountTikTok addSuccess={addSuccess} trigger={trigger} setTrigger={setTrigger} />
        </DialogContent>
      </Modal>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading} onClick={handleClose}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openToast}
        onClose={handleCloseToast}
        message={stateToast.message}
        key={vertical + horizontal}
      />
    </Grid>
  );
};

export default ManagementTikTok;
