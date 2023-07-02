import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MUIToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import Searchbar from './Searchbar';
import { Chatroom } from '../types/Chatroom';
import AddIcon from '@mui/icons-material/Add';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FriendsModal from './modals/FriendsModal';
import { User } from '../types/User';
import AvatarWrapper from './AvatarWrapper';

interface ToolbarProps {
  currentChat? : Chatroom
  currentUser: User;
  filterChat: string;
  filterChatUpdate: (v:string)=> void;
}
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Toolbar: React.FC<ToolbarProps> = ({currentUser, filterChat, filterChatUpdate  }) => {
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
                <Tooltip title="Informazioni profilo" arrow placement="bottom">
                  <IconButton
                      size="medium"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      onClick={handleOpenUserMenu}>
                    <AvatarWrapper name={currentUser.username}/>
                  </IconButton>
                </Tooltip>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> 
                  <Searchbar filterChat={filterChat} filterChatUpdate={filterChatUpdate}/>
                </Typography>
                <Tooltip title="Amicizie" arrow placement="bottom">
                  <IconButton
                    size="medium"
                    edge="end"
                    sx={{marginLeft: "10px"}}
                    color="inherit"
                    aria-label="menu"
                    onClick={handleFriendModalToggle}>
                    <PeopleAltIcon/>
                  </IconButton>
                </Tooltip>
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
                  <MenuItem sx={{display: "flex", flexDirection:"row", justifyContent:"center", alignContent: "center"}}>
                      <Typography textAlign="center"><strong style={{textAlign: 'center'}}>{currentUser.username}</strong></Typography>
                    </MenuItem>
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
