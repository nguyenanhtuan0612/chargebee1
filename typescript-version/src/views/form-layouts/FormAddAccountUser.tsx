// ** React Imports

// ** MUI Imports
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';

// ** Icons Imports

interface IProps {
  addSuccess: (value: boolean) => void;
  trigger: boolean;
  setTrigger: Dispatch<SetStateAction<boolean>>;
}
const FormAddAccountUser = (props: IProps) => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeRole = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const submitAccount = () => {
    const body = {
      email: email.replace(/^\s+|\s+$/gm, ''),
      password: password.replace(/^\s+|\s+$/gm, ''),
      role: role.replace(/^\s+|\s+$/gm, '')
    };

    const url = `${process.env.apiUrl}/api/users`;
    const token = localStorage.getItem('token');
    const header = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const data = axios
      .post(url, body, header)
      .then(res => {
        props.addSuccess(true);
        props.setTrigger(!props.trigger);
      })
      .catch(err => {
        props.addSuccess(false);
      });
  };

  return (
    <Card>
      <CardHeader title='Thêm tài khoản user' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Email'
                placeholder='Nhập email'
                value={email}
                onChange={handleChangeEmail}

                // inputProps={{ style: { fontSize: 14 } }}
                // InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Mật khẩu'
                placeholder='Nhập mật khẩu'
                value={password}
                onChange={handleChangePassword}

                // inputProps={{ style: { fontSize: 14 } }}
                // InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Vị trí</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={role}
                  label='Role'
                  onChange={handleChangeRole}
                >
                  <MenuItem value={'admin'}>Admin</MenuItem>
                  <MenuItem value={'collaborator'}>Công tác viên</MenuItem>
                  <MenuItem value={'customer'}>Khách hàng thường</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button fullWidth type='submit' variant='contained' onClick={submitAccount}>
                  Thêm
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormAddAccountUser;
