// ** MUI Imports
import { DialogContent, Modal, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { AccountTikTok } from 'src/@core/models/AccountTikTok.model';

interface PropsProduct {
  data: AccountTikTok;
  exchangeRate: number;
}

const CardAppleWatch = (props: PropsProduct) => {
  const { exchangeRate } = props;

  const calculatePrice = (coin: number) => {
    const price = (Math.floor((coin * exchangeRate) / 100 / 1000) + 1) * 1000;

    return price;
  };

  //Setting buyAccount
  const [openBuyAccount, setOpenBuyAccount] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'

    // width: 450
  };

  const handleOpenBuyAccount = () => setOpenBuyAccount(true);
  const handleCloseBuyAccount = () => setOpenBuyAccount(false);

  const popupBuyAccount = () => {
    handleOpenBuyAccount();
  };

  //settingSuccess
  const [openBuySucces, setOpenBuySuccess] = useState(false);
  const handleOpenBuySuccess = () => setOpenBuySuccess(true);
  const handleCloseBuySuccess = () => setOpenBuySuccess(false);

  const popupBuySuccess = () => {
    handleCloseBuyAccount();
    handleOpenBuySuccess();
  };

  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image='/images/cards/image-default-tiktok.png' />
      <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <Typography sx={{ marginBottom: 2 }}>
          Giá bán:
          <NumericFormat
            thousandSeparator
            suffix=' VND'
            value={props.data.price | calculatePrice(props.data.tiktokCoin) | 0}
            displayType={'text'}
          />
        </Typography>
        <Typography variant='body2'>
          Số xu: <NumericFormat thousandSeparator value={props.data.tiktokCoin | 0} displayType={'text'} />
        </Typography>
      </CardContent>
      <Button
        variant='contained'
        sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        onClick={popupBuyAccount}
      >
        Mua ngay
      </Button>

      {/* Modal buy account */}
      <Modal
        open={openBuyAccount}
        onClose={handleCloseBuyAccount}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <DialogContent sx={style}>
          <Card sx={{ maxWidth: 400 }}>
            <CardContent>
              <Typography gutterBottom variant='h6' component='div'>
                Mua tài khoản này
              </Typography>
              <Typography marginBottom={2} variant='body2' color='text.secondary'>
                Tài khoản của bạn đang là tài khoản thường
              </Typography>
              <Typography marginBottom={2} variant='body2' color='text.secondary'>
                Được chiết khấu ..%
              </Typography>
              <Typography marginBottom={2} variant='body2' color='text.secondary'>
                Giá: 20000
              </Typography>
              <Stack marginY={2} direction='row' spacing={2}>
                <Button size='small' variant='contained' onClick={popupBuySuccess}>
                  Mua ngay
                </Button>
                <Button size='small' variant='outlined'>
                  Huỷ
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </DialogContent>
      </Modal>

      <Modal
        open={openBuySucces}
        onClose={handleCloseBuySuccess}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <DialogContent sx={style}>
          {/* <Fade> */}
          <Card>
            <CardContent>
              <Typography gutterBottom variant='h6' component='div'>
                Mua tài khoản thành công
              </Typography>
              <Typography variant='body2' component='h2'>
                Tài khoản: admin@gmail.com
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Password: 123456
              </Typography>
            </CardContent>
          </Card>
          {/* </Fade> */}
        </DialogContent>
      </Modal>
    </Card>
  );
};

export default CardAppleWatch;
