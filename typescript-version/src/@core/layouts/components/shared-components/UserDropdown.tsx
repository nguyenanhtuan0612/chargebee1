// ** React Imports
import { Fragment, SyntheticEvent, useEffect, useState } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** MUI Imports
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ** Icons Imports
import { Backdrop, CircularProgress, Modal, Snackbar, SnackbarOrigin } from '@mui/material';
import AccountOutline from 'mdi-material-ui/AccountOutline';
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd';
import LogoutVariant from 'mdi-material-ui/LogoutVariant';
import ModalLogin from '../ModalLogin';
import ModalRegister from '../ModalRegister';
import { Account } from 'src/@core/models/UserInfo.model';

interface State {
  password: string;
  showPassword: boolean;
}

interface ILogin {
  email: string;
  password: string;
}

export interface StateToast extends SnackbarOrigin {
  openToast: boolean;
  message?: string;
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}));

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [account, setAccount] = useState<Account>({ id: '', email: '', role: '', balance: 0 });

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

  // ** Hooks
  const router = useRouter();

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    return;
  };

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const account = localStorage.getItem('account');
    if (!!token) {
      setIsLogin(true);
    }
    if (!!account) {
      setAccount(JSON.parse(account) || {});
    }
  }, []);

  // login
  const logIn = (success?: boolean) => {
    handleModalLoginClose();
    setIsLogin(true);
    handleOpenToast('Đăng nhập thành công');
  };

  // Logout

  const logOut = () => {
    handleDropdownClose();
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('account');
    setIsLogin(false);
    router.reload();
  };

  // register
  const registerAccount = (body: any) => {
    handleModalRegisterClose();
    handleOpenToast('Đăng kí thành công');
  };

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  };

  const [isModalLogin, setModalLoginOpen] = useState(false);
  const handleModalLoginOpen = () => {
    setAnchorEl(null);
    handleModalRegisterClose();
    setModalLoginOpen(true);
  };
  const handleModalLoginClose = () => {
    setModalLoginOpen(false);
  };
  const [isModalRegister, setModalRegisterOpen] = useState(false);
  const handleModalRegisterOpen = () => {
    setAnchorEl(null);
    handleModalLoginClose();
    setModalRegisterOpen(true);
  };
  const handleModalRegisterClose = () => {
    setModalRegisterOpen(false);
  };

  let menu;
  if (isLogin) {
    menu = (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar alt='John Doe' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{account.email}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('account-settings')}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            Thông tin cá nhân
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('deposit-money')}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Nạp tiền
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => logOut()}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Đăng xuất
        </MenuItem>
      </Menu>
    );
  } else {
    menu = (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ p: 0 }} onClick={() => handleModalLoginOpen()}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Đăng nhập
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => handleModalRegisterOpen()}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Đăng kí
        </MenuItem>
      </Menu>
    );
  }

  const styleModalLogin = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24
  };

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          alt='John Doe'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src='/images/avatars/1.png'
        />
      </Badge>
      {menu}

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
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading} onClick={handleClose}>
        <CircularProgress color='inherit' />
      </Backdrop>

      {/* toast */}

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openToast}
        onClose={handleCloseToast}
        message={stateToast.message}
        key={vertical + horizontal}
      />
    </Fragment>
  );
};

export default UserDropdown;
