// ** MUI Imports
import { DialogContent, Modal, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { AccountTikTok } from 'src/@core/models/AccountTikTok.model';
import { Account } from 'src/@core/models/UserInfo.model';
import Link from 'next/link';
import LoadingButton from '@mui/lab/LoadingButton';

interface PropsProduct {
  data: AccountTikTok;
  exchangeRate: number;
  discountForColaborator: number;
  setChange: Dispatch<SetStateAction<boolean>>;
  change: boolean;
}

interface AcountResponse {
  username: string;
  password: string;
}

const CardAppleWatch = (props: PropsProduct) => {
  const { exchangeRate, discountForColaborator, setChange, change } = props;

  const calculatePrice = (coin: number, discountForColaborator?: number) => {
    let price = (Math.floor((coin * exchangeRate) / 100 / 1000) + 1) * 1000;

    if (discountForColaborator) {
      const ratePrice = 100 - discountForColaborator;
      price = Math.floor((price * ratePrice) / 100 / 1000 + 1) * 1000;
    }

    return price;
  };

  //Setting buyAccount
  const [openBuyAccount, setOpenBuyAccount] = useState(false);
  const [account, setAccount] = useState<Account>({ role: '', id: '', email: '', balance: 0 });
  const [response, setResponse] = useState<AcountResponse>({ username: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);

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
  const handleCloseBuySuccess = () => {
    setOpenBuySuccess(false);
    setChange(!change);
  };

  const popupBuySuccess = () => {
    handleCloseBuyAccount();
    handleOpenBuySuccess();
  };

  //settingFail
  const [openBuyFail, setOpenBuyFail] = useState(false);

  const popupBuyFail = () => {
    handleCloseBuyAccount();
    setOpenBuyFail(true);
  };

  const handleBuyAccountBtnClick = async (id: number, price: number) => {
    setLoading(true);

    const token = localStorage.getItem('token');
    const url = `${process.env.apiUrl}/api/transactions/buyAccount`;
    await axios
      .post(
        url,
        { tiktokAcountId: id, price },
        {
          headers: {
            authorization: 'Bearer ' + token
          }
        }
      )
      .then(res => {
        setResponse(res.data);
        popupBuySuccess();
        setLoading(false);
      })
      .catch(() => {
        popupBuyFail();
        setLoading(false);
      });
  };

  useEffect(() => {
    const acc = JSON.parse(localStorage.getItem('account') || '{}');
    if (acc) {
      setAccount(acc);
    }
  }, []);

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
          <Card sx={{ maxWidth: 500 }}>
            <CardContent>
              <Typography gutterBottom variant='h6' component='div'>
                Bạn có muốn mua tài khoản này không ?
              </Typography>
              {account.role === 'collaborator' ? (
                <>
                  <Typography marginBottom={2} variant='body2' color='text.secondary'>
                    Tài khoản của bạn đang là tài khoản cộng tác viên
                  </Typography>
                  <Typography marginBottom={2} variant='body2' color='text.secondary'>
                    Được chiết khấu {discountForColaborator}%
                  </Typography>
                </>
              ) : null}
              <Typography marginBottom={2} variant='body2' color='text.secondary'>
                Xu: <NumericFormat thousandSeparator value={props.data.tiktokCoin | 0} displayType={'text'} />
              </Typography>
              {account.role === 'collaborator' ? (
                <>
                  <Typography
                    marginBottom={2}
                    variant='body2'
                    color='text.primary'
                    sx={{ textDecoration: 'line-through' }}
                  >
                    Giá gốc:{' '}
                    <NumericFormat
                      thousandSeparator
                      suffix=' VND'
                      value={props.data.price | calculatePrice(props.data.tiktokCoin) | 0}
                      displayType={'text'}
                    />
                  </Typography>
                  <Typography marginBottom={2} variant='body1' color='text.primary'>
                    Chỉ còn:{' '}
                    <NumericFormat
                      thousandSeparator
                      suffix=' VND'
                      value={
                        (props.data.price - (props.data.price * discountForColaborator) / 100) |
                        calculatePrice(props.data.tiktokCoin, discountForColaborator) |
                        0
                      }
                      displayType={'text'}
                    />
                  </Typography>
                </>
              ) : (
                <Typography marginBottom={2} variant='body1' color='text.primary'>
                  Giá:{' '}
                  <NumericFormat
                    thousandSeparator
                    suffix=' VND'
                    value={props.data.price | calculatePrice(props.data.tiktokCoin) | 0}
                    displayType={'text'}
                  />
                </Typography>
              )}

              <Stack marginY={2} direction='row' spacing={2}>
                {account.role === 'collaborator' ? (
                  <LoadingButton
                    loading={loading}
                    size='small'
                    variant='contained'
                    onClick={() =>
                      handleBuyAccountBtnClick(
                        props.data.id,
                        props.data.price - (props.data.price * discountForColaborator) / 100 ||
                          calculatePrice(props.data.tiktokCoin, discountForColaborator)
                      )
                    }
                  >
                    Mua ngay
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    loading={loading}
                    size='small'
                    variant='contained'
                    onClick={() =>
                      handleBuyAccountBtnClick(props.data.id, props.data.price || calculatePrice(props.data.tiktokCoin))
                    }
                  >
                    Mua ngay
                  </LoadingButton>
                )}

                <Button size='small' variant='outlined' onClick={handleCloseBuyAccount}>
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
                Tài khoản: {response.username}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Password: {response.password}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Xem lại thông tin những tài khoản đã mua{' '}
                <Link href='http://localhost:3000/account-settings/'>tại đây</Link>
              </Typography>
              <Stack marginY={2} direction='row' spacing={2}>
                <Button size='small' variant='outlined' onClick={handleCloseBuySuccess}>
                  Đóng
                </Button>
              </Stack>
            </CardContent>
          </Card>
          {/* </Fade> */}
        </DialogContent>
      </Modal>

      <Modal
        open={openBuyFail}
        onClose={() => setOpenBuyFail(false)}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <DialogContent sx={style}>
          {/* <Fade> */}
          <Card>
            <CardContent>
              <Typography gutterBottom variant='h6' component='div'>
                Mua tài khoản không thành công
              </Typography>
              <Stack marginY={2} direction='row' spacing={2}>
                <Button
                  size='small'
                  variant='outlined'
                  onClick={() => {
                    setOpenBuyFail(false);
                    setChange(!change);
                  }}
                >
                  Đóng
                </Button>
              </Stack>
            </CardContent>
          </Card>
          {/* </Fade> */}
        </DialogContent>
      </Modal>
    </Card>
  );
};

export default CardAppleWatch;
