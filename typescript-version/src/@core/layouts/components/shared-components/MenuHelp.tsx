import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const MenuHelp = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <IconButton onClick={handleClick} aria-haspopup='true' aria-controls='customized-menu'>
      <InfoOutlinedIcon>
        <Menu anchorEl={anchorEl} id='account-menu' open={open} onClick={handleClose}>
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
        </Menu>
      </InfoOutlinedIcon>
    </IconButton>
  );
};

export default MenuHelp;
