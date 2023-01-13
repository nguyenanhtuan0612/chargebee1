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
  Modal,
  Snackbar,
  SnackbarOrigin,
  Stack
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
  const [listAccounts, setlistAccounts] = useState<Array<any>>([]);

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
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6IjRkMzU2MDdhLWFjYWEtNDc3NS05OGVhLTliMWRkYTVlYjg3MCIsImlhdCI6MTY3MzA2Mjg5OCwiZXhwIjoxNzA0NTk4ODk4fQ.hjnpzFJWG52YXKhX_n_bm1TYH5z77k6wC3_NNcR5Ii8';
    const url = 'http://localhost:5001/api/users';
    const data = axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setLoading(false);
        setlistAccounts(res.data.rows);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

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
          <CardHeader title='Quản lý tài khoản' titleTypographyProps={{ variant: 'h6' }} />
          <Stack direction='row' justifyContent='flex-end' alignItems='flex-start' spacing={2} mb={4.5} mr={2}>
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
                <FormAddAccountUser addSuccess={addSuccess} />
              </DialogContent>
            </Modal>
          </Stack>
          <TableManagementAccount data={listAccounts} />
        </Card>
      </Grid>
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

export default ManagementAccounts;
