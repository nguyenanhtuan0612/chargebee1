// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import { Backdrop, CircularProgress } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import axios from 'axios';

interface Info {
  id: string;
  email: string;
  balance: number;
  role: 'admin' | 'customer' | 'collaborator';
}

const TabAccount = () => {
  // ** State
  const [info, setInfo] = useState<Info>({ id: '', email: '', balance: 0, role: 'admin' });
  const [isLoading, setLoading] = useState(false);
  const handleCloseLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const renderRoleString = (info: Info) => {
    switch (info.role) {
      case 'admin':
        return 'Quản trị viên';
      case 'customer':
        return 'Khách hàng';
      default:
        return 'Cộng tác viên';
    }
  };

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const token = localStorage.getItem('token');
      const url = 'http://localhost:5001/api/auth';
      const res = await axios.get(url, { headers: { authorization: 'Bearer ' + token } });
      setInfo(res.data);
      handleCloseLoading();
    }

    fetch();
  }, []);

  return (
    <>
      {' '}
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth inputProps={{ readOnly: true }} type='email' label='Email' value={info.email} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                inputProps={{ readOnly: true }}
                type='role'
                label='Vai trò'
                value={renderRoleString(info)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                inputProps={{ readOnly: true }}
                type='role'
                label='Số dư'
                value={info.balance.toLocaleString('en-US') + ' VND'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField inputProps={{ readOnly: true }} fullWidth type='role' label='Vai trò' defaultValue='Admin' />
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

export default TabAccount;
