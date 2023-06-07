import React from 'react';
import { useState, useContext } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { Box, Typography, Avatar, IconButton, Tooltip, MenuItem, Menu } from '@mui/material';
import BlogLogo from '../assets/bLOG.png';
import BlogContext from '../context/context';
import Stack from '@mui/material/Stack';

function Navbar() {
  
  const {isLoggined, setIsLoggined ,stringAvatar } = useContext(BlogContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlogOut = (setting) => {
    if(setting === "Logout"){
        setIsLoggined({ check: false });            
        localStorage.removeItem('isLoggined');    // locale storagedeki verileri sildim. 
    }
    else if (setting === 'Bloglarım') {
      const userId = isLoggined.id; // Kullanıcının ID'sini elde edin
      navigate(`/myblogs/${userId}`);
    }
  };

  const settings = ['Bloglarım', 'Logout'];

  return (
    <div>
      <div className="navbar">
        <div className="main">
          <Link to="/">
            <img src={BlogLogo} alt="" /> 
          </Link>
          <div className="mainLink">
            <Link to="/" className="homeStyle">
              <span></span>
            </Link>
            {isLoggined.check ? (
              <>
                <Box sx={{ flexGrow: 0 }}>  
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Stack direction="row" spacing={2}>
                        <Avatar className="avatar" {...stringAvatar(isLoggined.name)} />
                      </Stack>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '10px' }}
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
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <span onClick={() => handlogOut(setting)}>{setting}</span>
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            ) : (
              <Link to="/login">
                <button className="loginButton">Giriş Yap</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
