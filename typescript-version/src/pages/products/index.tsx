// ** MUI Imports
import {
  Backdrop,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AccountTikTok } from 'src/@core/models/AccountTikTok.model';
import { Account } from 'src/@core/models/UserInfo.model';

// ** Demo Components Imports
import CardAcountTiktokCoin from 'src/views/cards/CardAccountTiktokCoin';

const Product = () => {
  const [listAccounts, setlistAccounts] = useState<Array<AccountTikTok>>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [change, setChange] = useState<boolean>(true);
  const [account, setAccount] = useState<Account>({ role: '', id: '', email: '', balance: 0 });

  const [exchangeRate, setExchangRate] = useState(0);
  const [discountForColaborator, setDiscountForColaborator] = useState(0);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage] = useState(12);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [order, setOrder] = useState('asc');

  const handleCloseLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const url = `${process.env.apiUrl}/api/configs`;
      const res = await axios.get(url);
      setExchangRate(res.data.exchangeRate);
      setDiscountForColaborator(res.data.discountForColaborator);
    }

    fetch();
    const accountStr = localStorage.getItem('account');
    if (accountStr) {
      const data = JSON.parse(accountStr);
      setAccount(data);
    } else {
      setAccount({ role: '', id: '', email: '', balance: 0 });
    }
    const token = localStorage.getItem('token') || '';
    const url = `${process.env.apiUrl}/api/tiktokAccount/listTiktokAccountCoin`;
    let params: { limit: number; offset: number; filter?: string; order?: string } = {
      limit: rowsPerPage,
      offset: (page - 1) * rowsPerPage,
      order: JSON.stringify([{ prop: 'tiktokCoin', direction: order }])
    };
    if (valueFilterCoin) {
      let filter;
      switch (valueFilterCoin) {
        case '1':
          filter = JSON.stringify([{ operator: 'between', value: '[0, 999]', prop: 'tiktokCoin' }]);
          params = { ...params, filter };
          break;
        case '2':
          filter = JSON.stringify([{ operator: 'between', value: '[1000, 1999]', prop: 'tiktokCoin' }]);
          params = { ...params, filter };
          break;
        case '3':
          filter = JSON.stringify([{ operator: 'between', value: '[2000, 4999]', prop: 'tiktokCoin' }]);
          params = { ...params, filter };
          break;
        case '4':
          filter = JSON.stringify([{ operator: 'gte', value: '5000', prop: 'tiktokCoin' }]);
          params = { ...params, filter };
          break;
        default:
          break;
      }
    }
    const config = {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    axios
      .get(url, config)
      .then(res => {
        setlistAccounts(res.data.rows);
        setCount(res.data.count);
        const total = Math.floor(res.data.count / rowsPerPage) + 1;
        setTotalPage(total);
        handleCloseLoading();
      })
      .catch(() => {
        setLoading(false);
      });
  }, [change]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setChange(!change);
  };

  const [valueFilterCoin, setValueFilterCoin] = useState('0');

  const handleChangeFilterCoin = (event: SelectChangeEvent) => {
    setValueFilterCoin(event.target.value as string);
    setChange(!change);
  };

  const handleChangeOrderCoin = (event: SelectChangeEvent) => {
    setOrder(event.target.value as string);
    setChange(!change);
  };

  return count === undefined ? (
    <Grid>Hiện tại chưa có sản phẩm nào</Grid>
  ) : (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h6'>{'Danh sách tài khoản Tiktok'}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: {
            xs: 'column',
            sm: 'row'
          },
          gap: {
            xs: '15px'
          }
        }}
      >
        <Grid
          sx={{
            display: 'flex'
          }}
        >
          <Box sx={{ minWidth: 120 }}>
            <FormControl size='small' sx={{ marginRight: 3 }}>
              <InputLabel id='demo-simple-select-label'>Bộ lọc</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={valueFilterCoin}
                label='Bộ lọc'
                onChange={handleChangeFilterCoin}
              >
                <MenuItem value={'0'}>Tất cả</MenuItem>
                <MenuItem value={'1'}>Từ 0 xu đến 999 xu</MenuItem>
                <MenuItem value={'2'}>Từ 1000 xu đến 1999 xu</MenuItem>
                <MenuItem value={'3'}>Từ 2000 xu đến 4999 xu</MenuItem>
                <MenuItem value={'4'}>Lớn hơn 5000 xu</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 60 }}>
            <FormControl size='small'>
              <InputLabel id='demo-simple-select-label'>Sắp xếp</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={order}
                label='Sắp xếp'
                onChange={handleChangeOrderCoin}
              >
                <MenuItem value={'asc'}>Xu tăng dần</MenuItem>
                <MenuItem value={'desc'}>Xu giảm dần</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Pagination count={totalPage} page={page} onChange={handleChangePage} />
      </Grid>
      {listAccounts.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CardAcountTiktokCoin
            data={item}
            exchangeRate={exchangeRate}
            discountForColaborator={discountForColaborator}
            setChange={setChange}
            change={change}
            account={account}
            setAccount={setAccount}
          />
        </Grid>
      ))}
      <Grid item xs={12} sx={{ justifyContent: 'space-between' }}>
        <Pagination count={totalPage} page={page} onChange={handleChangePage} />
      </Grid>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Grid>
  );
};

export default Product;
