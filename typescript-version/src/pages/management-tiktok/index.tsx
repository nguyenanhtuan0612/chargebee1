// ** MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

// ** Demo Components Imports
import { Backdrop, Button, CircularProgress, DialogContent, Modal, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AccountTikTok } from 'src/@core/models/AccountTikTok.model';
import FormAddAccountTikTok from 'src/views/form-layouts/FormAddAccountTikTok';
import TableManagementTikTok from 'src/views/tables/TableManagementTikTok';

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
    const data = axios
      .post(url, formData, header)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const url = `${process.env.apiUrl}/api/tiktokAccount/listTiktokAccountCoinForAdmin`;
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
  }, [page, rowsPerPage]);

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
          <FormAddAccountTikTok />
        </DialogContent>
      </Modal>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading} onClick={handleClose}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Grid>
  );
};

export default ManagementTikTok;
