// ** MUI Imports
import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

// ** Demo Components Imports
import { useState } from 'react';

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

const DepositMoney = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Card>
          <CardHeader title='Hướng dẫn nạp tiền vào tài khoản' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <Typography variant='body1'>Để nạp tiền vào tài khoản vui lòng chuyển khoản theo thông tin sau:</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <CardHeader title='Nạp tiền' titleTypographyProps={{ variant: 'h6' }} />
      </Grid>
    </Grid>
  );
};

export default DepositMoney;
