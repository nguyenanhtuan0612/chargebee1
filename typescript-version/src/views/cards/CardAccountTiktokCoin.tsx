// ** MUI Imports
import { Backdrop, Box, CircularProgress, DialogContent, Grid, Modal, Snackbar, Stack } from '@mui/material';
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
import ModalLogin from 'src/@core/layouts/components/ModalLogin';
import { StateToast } from 'src/@core/layouts/components/shared-components/UserDropdown';
import ModalRegister from 'src/@core/layouts/components/ModalRegister';
import { width } from '@mui/system';

interface PropsProduct {
  data: AccountTikTok;
  exchangeRate: number;
  discountForColaborator: number;
  setChange: Dispatch<SetStateAction<boolean>>;
  change: boolean;
  setAccount: Dispatch<SetStateAction<any>>;
  account: Account;
}

interface AcountResponse {
  username: string;
  password: string;
}

const CardAcountTiktokCoin = (props: PropsProduct) => {
  const { exchangeRate, discountForColaborator, setChange, change, setAccount, account } = props;

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

  const [response, setResponse] = useState<AcountResponse>({ username: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 430
  };

  const styleNotLogin = {
    ...style,
    width: 430
  };

  const handleOpenBuyAccount = () => setOpenBuyAccount(true);
  const handleCloseBuyAccount = () => {
    setOpenBuyAccount(false);
    setChange(!change);
  };

  const popupBuyAccount = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      return setOpenNotLogin(true);
    }
    const url = `${process.env.apiUrl}/api/auth`;
    await axios.get(url, { headers: { authorization: 'Bearer ' + token } }).then(({ data }) => {
      setAccount(data);
      data = JSON.stringify(data);
      localStorage.setItem('account', data);
    });
    handleOpenBuyAccount();
    setLoading(false);
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

  //set modalNotLogin
  const [openNotLogin, setOpenNotLogin] = useState(false);

  const handleCloseModalNotLogin = () => {
    setOpenNotLogin(false);
  };

  // const popupBuyFail = () => {
  //   handleCloseBuyAccount();
  // };

  useEffect(() => {
    const acc = JSON.parse(localStorage.getItem('account') || '{}');
    if (acc) {
      setAccount(acc);
    }
  }, []);

  // tạm thời tiêm tríck

  const [stateToast, setStateToast] = useState<StateToast>({
    openToast: false,
    vertical: 'top',
    horizontal: 'right'
  });

  const { vertical, horizontal, openToast } = stateToast;

  const handleOpenToast = (message: string) => {
    setStateToast({ ...stateToast, openToast: true, message: message });
    handleCloseToast();
  };

  const handleCloseToast = () => {
    setTimeout(() => {
      setStateToast({ ...stateToast, openToast: false });
    }, 1000);
  };

  // const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const styleModalLogin = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24
  };

  const [isModalLogin, setModalLoginOpen] = useState(false);
  const handleModalLoginOpen = () => {
    setOpenNotLogin(false);
    handleModalRegisterClose();
    setModalLoginOpen(true);
  };
  const handleModalLoginClose = () => {
    setModalLoginOpen(false);
  };
  const [isModalRegister, setModalRegisterOpen] = useState(false);
  const handleModalRegisterOpen = () => {
    setOpenNotLogin(false);
    handleModalLoginClose();
    setModalRegisterOpen(true);
  };
  const handleModalRegisterClose = () => {
    setModalRegisterOpen(false);
  };

  const logIn = (success?: boolean) => {
    handleModalLoginClose();

    // setIsLogin(true);
    handleOpenToast('Đăng nhập thành công');
  };

  const registerAccount = (body: any) => {
    handleModalRegisterClose();
    handleOpenToast('Đăng kí thành công');
  };

  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image='/images/cards/image-default-tiktok.png' />
      <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        {account.role === 'collaborator' ? (
          <Grid sx={{ display: 'flex' }}>
            <Typography sx={{ marginBottom: 2 }}>
              Giá bán:{' '}
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
            <Typography sx={{ marginLeft: 2, textDecoration: 'line-through' }} variant='body2'>
              <NumericFormat
                thousandSeparator
                suffix=' VND'
                value={props.data.price | calculatePrice(props.data.tiktokCoin) | 0}
                displayType={'text'}
              />
            </Typography>
          </Grid>
        ) : (
          <Typography sx={{ marginBottom: 2 }}>
            Giá bán:
            <NumericFormat
              thousandSeparator
              suffix=' VND'
              value={props.data.price | calculatePrice(props.data.tiktokCoin) | 0}
              displayType={'text'}
            />
          </Typography>
        )}
        <Typography variant='body2'>
          Số xu: <NumericFormat thousandSeparator value={props.data.tiktokCoin | 0} displayType={'text'} />
        </Typography>
      </CardContent>
      {account.role === 'admin' ? null : (
        <Button
          variant='contained'
          sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          onClick={popupBuyAccount}
        >
          Mua ngay
        </Button>
      )}

      {/* Modal buy account */}
      <Modal
        open={openBuyAccount}
        onClose={handleCloseBuyAccount}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <DialogContent sx={[style, { width: { sm: 500 } }]}>
          <Card sx={{ maxWidth: 500 }}>
            <CardContent>
              <Typography marginBottom={4} gutterBottom variant='h6' component='div'>
                Bạn có muốn mua tài khoản này không?
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
                <Typography marginBottom={2} variant='body1' color='text.primary' noWrap={true}>
                  Giá:{' '}
                  <NumericFormat
                    thousandSeparator
                    suffix=' VND'
                    value={props.data.price | calculatePrice(props.data.tiktokCoin) | 0}
                    displayType={'text'}
                  />
                </Typography>
              )}

              <Stack marginTop={3} direction='row' spacing={2} justifyContent='center'>
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
                Xem lại thông tin những tài khoản đã mua <Link href='/account-settings'>tại đây</Link>
              </Typography>
              <Stack marginTop={3} direction='row' spacing={2} justifyContent='center'>
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
          <Card>
            <CardContent>
              <Typography gutterBottom variant='h6' component='div' textAlign='center'>
                Mua tài khoản không thành công
              </Typography>
              <Stack marginTop={3} direction='row' spacing={2} justifyContent='center'>
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
        </DialogContent>
      </Modal>

      <Modal
        open={openNotLogin}
        onClose={handleCloseModalNotLogin}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <DialogContent sx={[styleNotLogin, { width: { md: '450px' } }]}>
          <Card>
            <CardContent>
              <Typography marginBottom={4} gutterBottom variant='h6' textAlign='center' component='div'>
                Bạn chưa đăng đăng nhập tài khoản
              </Typography>
              <Stack marginY={2} direction='row' justifyContent='center' spacing={2}>
                <Button size='small' variant='contained' onClick={handleModalLoginOpen}>
                  Đăng nhập
                </Button>

                <Button size='small' variant='outlined' onClick={handleModalRegisterOpen}>
                  Đăng kí
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </DialogContent>
      </Modal>

      {/* tiêm chích */}

      <Modal
        open={isModalLogin}
        onClose={handleModalLoginClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModalLogin}>{<ModalLogin submitLogin={logIn} openRegister={handleModalRegisterOpen} />}</Box>
      </Modal>

      {/* Modal Register */}

      <Modal
        open={isModalRegister}
        onClose={handleModalRegisterClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModalLogin}>
          {<ModalRegister submitRegister={registerAccount} openLogin={handleModalLoginOpen} />}
        </Box>
      </Modal>
      {/* <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop> */}

      {/* toast */}

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openToast}
        onClose={handleCloseToast}
        message={stateToast.message}
        key={vertical + horizontal}
      />
    </Card>
  );
};

export default CardAcountTiktokCoin;
