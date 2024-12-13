import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';  
import LanguageIcon from '@mui/icons-material/Language';
import { getUser, logout } from '../../state/Auth/Action';

const settings = ['Dashboard', 'Logout'];
const languages = ['English', 'Spanish', 'French', 'German'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElLang, setAnchorElLang] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English"); // State to track selected language
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [token, auth.token]);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleOpenLangMenu = (event) => setAnchorElLang(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleCloseLangMenu = () => setAnchorElLang(null);

  const handleShoppingCartClick = () => {
    navigate('/admin/products');
  };

  const handleDashboardClick = () => {
    navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
    localStorage.removeItem('user'); // Remove user from localStorage on logout
    navigate('/'); // Redirect to login page
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language); // Update selected language state
    console.log(`Language changed to: ${language}`);
    handleCloseLangMenu();
  };

  const handleUserClick = () => {
    setOpen(!open); // Toggle the state for opening/closing the menu
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" className="group flex items-center">
            <span className="sr-only">TrendIsta</span>
            <img
              src="/Preview.png"
              alt="TrendIsta"
              className="h-12 w-12 mr-2"
            />
            <p className="font-bold text-lg">TrendIsta</p>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {/* Add menu items here */}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              size="large"
              aria-label="go to shopping cart"
              color="inherit"
              onClick={handleShoppingCartClick}
            >
              <ShoppingCartIcon />
            </IconButton>

            <IconButton
              size="large"
              aria-label="language menu"
              color="inherit"
              onClick={handleOpenLangMenu}
            >
              <LanguageIcon />
              <Typography variant="body1" ml={1}>
                {selectedLanguage} {/* Display the selected language */}
              </Typography>
            </IconButton>

            <Menu
              id="menu-language"
              anchorEl={anchorElLang}
              open={Boolean(anchorElLang)}
              onClose={handleCloseLangMenu}
            >
              {languages.map((language) => (
                <MenuItem key={language} onClick={() => handleLanguageChange(language)}>
                  <Typography sx={{ textAlign: 'center' }}>{language}</Typography>
                </MenuItem>
              ))}
            </Menu>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                {auth.user?.firstname ? (
                  <div>
                    <Avatar
                      aria-controls={anchorElUser ? 'user-menu' : undefined}
                      aria-haspopup="true"
                      onClick={handleOpenUserMenu} // Enable menu toggle on avatar click
                      sx={{
                        bgcolor: '#1976d2', // Or use your primary color
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      {auth.user?.firstname[0].toUpperCase()} {/* Display first letter of user's name */}
                    </Avatar>
                  </div>
                ) : (
                  <div>No user</div> // Fallback if there's no user (optional)
                )}
              </Tooltip>
              <Menu
                id="user-menu"
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
                <MenuItem onClick={handleDashboardClick}>
                  <Typography sx={{ textAlign: 'center' }}>Dashboard</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
