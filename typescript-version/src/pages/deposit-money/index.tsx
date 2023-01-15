// ** MUI Imports
import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

// ** Demo Components Imports
import axios from 'axios';
import { useEffect, useState } from 'react';

interface IInfoAdmin {
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
}

const DepositMoney = () => {
  const [infoAdmin, setInfoAdmin] = useState<IInfoAdmin>({});
  const fetchData = () => {
    const url = `${process.env.apiUrl}/api/configs`;
    axios.get(url).then(res => setInfoAdmin(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Card>
          <CardHeader title='Hướng dẫn nạp tiền vào tài khoản' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <Typography variant='body2'>
              Chuyển tiền đến tài khoản của Tóp Tóp, nội dung là số điện thoại đăng ký tài khoản, số dư sẽ tự động cập
              nhật.
            </Typography>
            <Typography variant='body2'>Để nạp tiền vào tài khoản vui lòng chuyển khoản theo thông tin sau:</Typography>
            <ul>
              <li>
                <Typography variant='body2'>{infoAdmin.bankName}</Typography>
              </li>
              <li>
                <Typography variant='body2'>STK: {infoAdmin.accountNumber}</Typography>
              </li>
              <li>
                <Typography variant='body2'>Chủ tài khoản: {infoAdmin.accountName}</Typography>
              </li>
              <li>
                <Typography variant='body2'>ND chuyển: Email đã đăng kí (VD: abc@gmail.com)</Typography>
              </li>
            </ul>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardHeader title='Hỗ trợ liên hệ:' titleTypographyProps={{ variant: 'h6' }} />
          <ul style={{ padding: '0px 40px' }}>
            <li>
              <Typography variant='body2'>
                Khi gặp các lỗi không nạp được tài khoản xin các bạn vui lòng liên hệ: 0869 158 732.
              </Typography>
            </li>
            <li>
              <Typography variant='body2'>
                Tất cả vấn đề liên quan đến số dư, lỗi tài khoản vui lòng liên hệ Admin để được hỗ trợ hoặc hoàn tiền.
              </Typography>
            </li>
          </ul>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DepositMoney;
