import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MUIToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Badge, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import Searchbar from './Searchbar';
import { Chatroom } from '../types/Chatroom';
import AddIcon from '@mui/icons-material/Add';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FriendsModal from './modals/FriendsModal';
import { User } from '../types/User';
import AvatarWrapper from './AvatarWrapper';
import { FriendshipRequest } from '../types/FriendshipRequest';
import { cAPIWrapper } from '../services/HttpWrapper';

interface ToolbarProps {
  currentChat? : Chatroom
  currentUser: User;
  filterChat: string;
  friendshipsReq: FriendshipRequest[];
  filterChatUpdate: (v:string)=> void;
  updateFriendshipsReq: (newReqs: FriendshipRequest[]) => void
  friends: User[];
}

const Toolbar: React.FC<ToolbarProps> = ({currentUser, filterChat, filterChatUpdate,friendshipsReq,updateFriendshipsReq, friends  }) => {
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

  const runLogout = () => {
    cAPIWrapper.post("/users/logout").then(res=> {
        window.location.reload();
    })
    handleCloseUserMenu();
  } 
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
                      <Badge badgeContent={friendshipsReq.length} color="warning">
                        <PeopleAltIcon/>
                      </Badge>
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
                    <MenuItem  onClick={()=>runLogout()}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
              </MUIToolbar>
            </AppBar>
          </Stack>
          <FriendsModal 
            open={showFriendsModal} 
            toggleOpen={handleFriendModalToggle}
            friendshipsReq={friendshipsReq}
            currentUser={currentUser}
            friends={friends}
            updateFriendshipsReq={updateFriendshipsReq}
          ></FriendsModal>
        </>
    );
};

export default Toolbar;
