import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import axios from 'axios';
import CallIcon from '@mui/icons-material/Call';
import TelegramIcon from '@mui/icons-material/Telegram';
import { right } from '@popperjs/core';

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

  const [infoAdmin, setInfoAdmin] = useState<IInfoAdmin>({});
  const fetchData = () => {
    const url = `${process.env.apiUrl}/api/configs`;
    axios.get(url).then(res => setInfoAdmin(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              Liên hệ
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
        sx={{ width: 200, padding: '8' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Typography variant='body1' sx={{ ml: 4 }}>
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
          <img src='/images/zalo.svg' style={{ marginRight: '8px' }}></img>
          <Typography variant='body2' sx={{ fontSize: 13 }}>
            0869 158 732
          </Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default MenuHelp;
