import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MUIToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Chatroom } from '../types/Chatroom';
import AvatarWrapper from './AvatarWrapper';
import { ListItemButton } from '@mui/material';
import ChatroomInfoModal from './modals/ChatroomInfoModal';
import { User } from '../types/User';
import Searchbar from './Searchbar';
import SearchMessage from './SearchMessage';

interface ChatbarProps {
  currentChat : Chatroom | undefined;
  user: User;
  usernamesMap: any
  filterMsg: string,
  updateFilterMsg: (msg:string) => void
}

const Chatbar: React.FC<ChatbarProps> = ({ currentChat,user ,usernamesMap, filterMsg, updateFilterMsg}) => {
    const [isInfoModalOpen, setInfoModalOpen] = useState(false);
    const toggleModal = () => setInfoModalOpen( (prev) => !prev);
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"
              sx={{justifyContent:"center", flexDirection:"column", display:"flex", height:"80px" }}>
              {(currentChat && currentChat.name !== undefined )  &&  <MUIToolbar>
                <ListItemButton onClick={()=>toggleModal()}>
                  <IconButton 
                    color="inherit"
                    size="large">
                    <AvatarWrapper name={currentChat.name}/>
                  </IconButton>
                  <Box sx={{ flexGrow: 1 }}>
                    <h3>{currentChat.name}</h3>
                  </Box>
                </ListItemButton>
                <SearchMessage
                  filterMsg={filterMsg}
                  updateFilterMsg={updateFilterMsg}
                />
              </MUIToolbar>}
            </AppBar>
          </Box>
          {currentChat !== undefined && <ChatroomInfoModal
            open={isInfoModalOpen}
            toggleOpen={toggleModal}
            chat={currentChat}
            usernamesMap={usernamesMap}
            user={user}
          />}
        </>
    );
};
//sposta componenti e modifica searchbar

export default Chatbar;
