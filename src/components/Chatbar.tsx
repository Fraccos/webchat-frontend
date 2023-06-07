import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MUIToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

interface ChatbarProps {

}

const Chatbar: React.FC<ChatbarProps> = ({  }) => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <MUIToolbar>
                <IconButton 
                  color="inherit"
                  size="medium">
                  <AccountCircleIcon 
                    fontSize='medium'/>
                </IconButton>
                <h4>NOME CHAT</h4>
                <SearchIcon />
                <IconButton
                  size="medium"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{justifyContent: 'right', display: 'flex'}}>
                  <MoreVertIcon/>
                </IconButton>
              </MUIToolbar>
            </AppBar>
          </Box>
        </>
    );
};
//sposta componenti e modifica searchbar

export default Chatbar;
