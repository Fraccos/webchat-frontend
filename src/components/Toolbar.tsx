import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MUIToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem } from '@mui/material';
import Searchbar from './Searchbar';


interface ToolbarProps {

}
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Toolbar: React.FC<ToolbarProps> = ({  }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
                  aria-label="menu"
                  onClick={handleOpenUserMenu}>
                  <MoreHorizOutlinedIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> 
                  <Searchbar/>
                </Typography>


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
          </Box>
        </>
    );
};
//le scelte grafice sono ancora temporanee
//riga 66

export default Toolbar;
