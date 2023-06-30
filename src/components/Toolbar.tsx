import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MUIToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem, Stack } from '@mui/material';
import Searchbar from './Searchbar';
import { Chatroom } from '../types/Chatroom';
import AddIcon from '@mui/icons-material/Add';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FriendsModal from './modals/FriendsModal';
import { User } from '../types/User';

interface ToolbarProps {
  currentChat? : Chatroom
  currentUser: User;
}
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Toolbar: React.FC<ToolbarProps> = ({currentUser  }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const [showFriendsModal, setShowFriendsModal] = useState(false);

  const handleFriendModalToggle = () => {
    setShowFriendsModal( (prev) => !prev);
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    return (
        <>
          <Stack sx={{ flexGrow: 1}} >
            <AppBar position="static" 
              sx={{justifyContent:"center", flexDirection:"column", display:"flex", height:"80px" }} >
              <MUIToolbar>
                <IconButton
                  size="medium"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleOpenUserMenu}>
                  <MoreHorizOutlinedIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> 
                  <Searchbar/>
                </Typography>
                <IconButton
                  size="medium"
                  edge="end"
                  sx={{marginLeft: "10px"}}
                  color="inherit"
                  aria-label="menu"
                  onClick={handleFriendModalToggle}>
                  <PeopleAltIcon/>
                </IconButton>

                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  <IconButton 
                    color="inherit"
                    size="medium"
                    onClick={handleCloseUserMenu}
                    sx={{justifyContent: 'center', display: 'flex'}}>
                    <AccountCircleIcon/>
                  </IconButton>
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </MUIToolbar>
            </AppBar>
          </Stack>
          <FriendsModal 
            open={showFriendsModal} 
            toggleOpen={handleFriendModalToggle}
            currentUser={currentUser}
          ></FriendsModal>
        </>
    );
};

export default Toolbar;
