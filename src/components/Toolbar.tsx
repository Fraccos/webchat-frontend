import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MUIToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MenuItem } from '@mui/material';
import Searchbar from './Searchbar';


interface ToolbarProps {

}
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Toolbar: React.FC<ToolbarProps> = ({  }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    {settings.map((setting) => (
      <MenuItem key={setting} >
        <Typography textAlign="center">{setting}</Typography>
      </MenuItem>
    ))}
  };

    return (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <MUIToolbar>
                <IconButton
                  size="medium"
                  edge="start"
                  color="inherit"
                  aria-label="menu">
                  <MoreHorizOutlinedIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> 
                  <Searchbar/>
                </Typography>
                <IconButton 
                  color="inherit"
                  size="medium"
                  onClick={handleOpenUserMenu}>
                  <AccountCircleIcon 
                    fontSize='medium'/>
                </IconButton>
              </MUIToolbar>
            </AppBar>
          </Box>
        </>
    );
};
//le scelte grafice sono ancora temporanee
//aggiungere menù a tendina in caso di pressione di uno dei pulsanti (ho provato ad aggiungerlo ma non funziona)
//https://mui.com/material-ui/react-app-bar/#ResponsiveAppBar.tsx

export default Toolbar;
