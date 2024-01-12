import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import Cookies from 'js-cookie';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';

export default function DenseAppBar() {
  const handleLogout=()=>{
    Cookies.remove('access_token');
    window.location.href='/user-login';
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"
      sx={{
        backgroundColor: '#660066'  
      }}
      >
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            File Management
          </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <Tooltip  title="Logout" >
            <Button onClick={handleLogout}
                    style={{color:"white"}}><LogoutIcon/></Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}