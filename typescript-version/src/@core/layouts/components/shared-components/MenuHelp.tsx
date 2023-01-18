import { Box, Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Fragment, useState } from 'react';

import CallIcon from '@mui/icons-material/Call';
import TelegramIcon from '@mui/icons-material/Telegram';
import Typography from '@mui/material/Typography';

interface IInfoAdmin {
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
}

const MenuHelp = () => {
  // const [anchorElDropDown, setAnchorElDropDown] = useState<null | HTMLElement>(null);
  // const openDropDown = Boolean(anchorElDropDown);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorElDropDown(event.currentTarget);
  // };

  // const handleCloseDropDown = () => {
  //   setAnchorElDropDown(null);
  // };

  //help

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Button variant='contained' disableRipple>
              Liên hệ - Bảo hành
            </Button>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          style: {
            paddingRight: '8px'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box>
          <Typography variant='body1' sx={{ ml: 4 }}>
            Thông báo: Tài khoản được bảo hành 24 giờ
          </Typography>
          <MenuItem>
            <Typography variant='body2' sx={{ fontSize: 13 }}>
              - Cấm thả rương
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant='body2' sx={{ fontSize: 13 }}>
              - Cấm spam quà
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant='body2' sx={{ fontSize: 13 }}>
              - Cấm donate video
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant='body2' sx={{ fontSize: 13 }}>
              Vi phạm sẽ không được bảo hành
            </Typography>
          </MenuItem>
        </Box>
        <Typography variant='body1' sx={{ ml: 4, mt: 3 }}>
          Thông tin hỗ trợ
        </Typography>
        <MenuItem>
          <CallIcon fontSize='small' sx={{ marginRight: 2 }} />
          <Typography variant='body2' sx={{ fontSize: 13 }}>
            0869 158 732
          </Typography>
        </MenuItem>
        <MenuItem>
          <TelegramIcon fontSize='small' sx={{ marginRight: 2 }} />
          <Typography variant='body2' sx={{ fontSize: 13 }}>
            0869 158 732
          </Typography>
        </MenuItem>
        <MenuItem>
          <img alt='zalo' src='/images/zalo.svg' style={{ marginRight: '8px' }}></img>
          <Typography variant='body2' sx={{ fontSize: 13 }}>
            0869 158 732
          </Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default MenuHelp;
