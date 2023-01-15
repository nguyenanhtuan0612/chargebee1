// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';

interface IProps {
  addSuccess: (value: boolean) => void;
  trigger: boolean;
  setTrigger: Dispatch<SetStateAction<boolean>>;
}

// ** Icons Imports
const FormAddAccountTikTok = (props: IProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [tikTokCoin, setTikTokCoin] = useState<string>('');

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeTikTokCoin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTikTokCoin(event.target.value as string);
  };

  const submitAccount = () => {
    const body = {
      username: email.replace(/^\s+|\s+$/gm, ''),
      password: password.replace(/^\s+|\s+$/gm, ''),
      tiktokCoin: +tikTokCoin.replace(/^\s+|\s+$/gm, '')
    };

    const url = `${process.env.apiUrl}/api/tiktokAccount/createTiktokAccountCoin`;
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
      <CardHeader title='Thêm tài khoản tiktok' titleTypographyProps={{ variant: 'h6' }} />
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
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Mật khẩu'
                placeholder='Nhập mật khẩu'
                value={password}
                onChange={handleChangePassword}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='Xu tiktok'
                label='Xu tiktok'
                value={tikTokCoin}
                onChange={handleChangeTikTokCoin}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
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

export default FormAddAccountTikTok;
