// ** React Imports
import { ChangeEvent, forwardRef, useEffect, useState } from 'react';

// ** MUI Imports
import { Backdrop, CircularProgress, Snackbar, SnackbarOrigin } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { CommentProcessing } from 'mdi-material-ui';

// ** Icons Imports

interface State {
  exchangeRate: number;
  discountForColaborator: number;
  accountName: string;
  accountNumber: string;
  bankName: string;
  secureToken: string;
}

interface StateToast extends SnackbarOrigin {
  openToast: boolean;
  message?: string;
}

const NumberFormatCurrency = forwardRef(function NumberFormatCustom(props: any, ref) {
  const { onChange, ...other } = props;

  return <NumericFormat {...other} getInputRef={ref} onChange={onChange} thousandSeparator suffix=' VND' />;
});

const NumberFormatPercent = forwardRef(function NumberFormatCustom(props: any, ref) {
  const { onChange, ...other } = props;

  return <NumericFormat {...other} getInputRef={ref} onChange={onChange} suffix=' %' />;
});

const TabSystemConfig = () => {
  // ** States
  const [values, setValues] = useState<State>({
    exchangeRate: 0,
    discountForColaborator: 0,
    accountName: '',
    accountNumber: '',
    bankName: '',
    secureToken: ''
  });
  const [stateToast, setStateToast] = useState<StateToast>({
    openToast: false,
    vertical: 'top',
    horizontal: 'right'
  });
  const { vertical, horizontal, openToast } = stateToast;
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const url = 'http://localhost:5001/api/configs';
      const data = await axios.get(url);
      setValues(data.data);
      handleCloseLoading();
    }

    fetch();
  }, []);

  // Handle
  const handleStateChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleStateChangeFormatPercent = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value.split(' %')[0]) || 0;
    setValues({ ...values, [prop]: value });
  };

  const handleStateChangeFormatCurrency = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    const rate = event.target.value.split(' VND')[0].replaceAll(',', '');
    const value = parseInt(rate) || 0;
    setValues({ ...values, [prop]: value });
  };

  const handleSaveBtnClick = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const url = 'http://localhost:5001/api/updateConfig';
    await axios.put(url, values, {
      headers: {
        authorization: 'Bearer ' + token
      }
    });
    handleCloseLoading();
    setStateToast({ ...stateToast, openToast: true });
    handleCloseToast();
  };

  const handleCloseToast = () => {
    setTimeout(() => {
      setStateToast({ ...stateToast, openToast: false });
    }, 1000);
  };

  const handleCloseLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='discountForColaborator'>Chiết khấu cho cộng tác viên</InputLabel>
                  <OutlinedInput
                    label='Chiết khấu cho cộng tác viên'
                    value={values.discountForColaborator}
                    id='discountForColaborator'
                    type={'text'}
                    onChange={handleStateChangeFormatPercent('discountForColaborator')}
                    inputComponent={NumberFormatPercent}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='exchangeRate'>Tỉ giá quy đổi $</InputLabel>
                  <OutlinedInput
                    label='Tỉ giá quy đổi $'
                    value={values.exchangeRate}
                    id='exchangeRate'
                    onChange={handleStateChangeFormatCurrency('exchangeRate')}
                    inputComponent={NumberFormatCurrency}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='secureToken'>Seruce Token Casso</InputLabel>
                  <OutlinedInput
                    label='Seruce Token Casso'
                    value={values.secureToken}
                    id='secureToken'
                    type={'text'}
                    onChange={handleStateChange('secureToken')}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='bankName'>Tên ngân hàng</InputLabel>
                  <OutlinedInput
                    label='Tên ngân hàng'
                    value={values.bankName}
                    id='bankName'
                    type={'text'}
                    onChange={handleStateChange('bankName')}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='accountNumber'>Số tài khoản</InputLabel>
                  <OutlinedInput
                    label='Số tài khoản'
                    value={values.accountNumber}
                    id='accountNumber'
                    type={'text'}
                    onChange={handleStateChange('accountNumber')}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='accountName'>Tên chủ tài khoản</InputLabel>
                  <OutlinedInput
                    label='Tên chủ tài khoản'
                    value={values.accountName}
                    id='accountName'
                    type={'text'}
                    onChange={handleStateChange('accountName')}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 3, marginBottom: 8 }}>
          <Button variant='contained' sx={{ marginRight: 2 }} onClick={handleSaveBtnClick}>
            Lưu thay đổi
          </Button>
        </Box>
      </CardContent>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>

      {/* <Divider sx={{ margin: 0 }} /> */}

      {/* <CardContent></CardContent> */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openToast}
        onClose={handleCloseToast}
        message={'Cập nhật thành công !'}
        key={vertical + horizontal}
      />
    </form>
  );
};
export default TabSystemConfig;
