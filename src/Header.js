import {
  AppBar, Box, Toolbar,
  Typography, IconButton, CardMedia,
  Popover, Tooltip, Stack,
} from '@mui/material/';

import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import TranslateIcon from '@mui/icons-material/Translate';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import logo from './img/logo512.png';
import { connect, useDispatch, useSelector } from 'react-redux'
import { menuOpen, switchLang, switchTheme, userStatusChange } from './state/actions'

let Header = () => {

  const isLight = useSelector((state) => state.isLight)
  const dispatch = useDispatch()

  const [ cookies ] = useCookies(['user'])

  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenPopover = (event) => setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);
  const isOpen = Boolean(anchorEl);

  useEffect(()=>{
    if (cookies.isLogged === 'logged_in' ) {
      dispatch(userStatusChange('logged_in'))
    } else if (cookies.isLogged === 'waiting_token' ) {
      dispatch(userStatusChange('waiting_token'))
    } else {
      dispatch(userStatusChange('logged_out'))
    }
    }, [cookies.isLogged,dispatch]);

  return (
    <Box sx={{
        flexGrow: 1,
      }}>
      <AppBar
      position="fixed">
        <Toolbar
        sx={{
          display:'flex',
          justifyContent:'center',
        }}>

          <Box
          sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            maxWidth:'680px',
          }}>

        <Tooltip title="Нажмите чтобы скрыть меню" arrow>
          <IconButton
          onClick={()=>{
            dispatch(menuOpen())
          }
          }
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          </Tooltip>

          <Box
          component={RouterLink}
          sx={{
            display:'flex',
            flexGrow: 1,
            textDecoration:'none',
            '&:visited': {
              color: 'inherit',
            },
          }}
          >

            <CardMedia
            component="img"
            image={logo}
            alt='movies-logo'
            sx={{
              height:'30px',
              width:'30px',
          }}
            />
          
            <Typography 
            sx={{
              ml:2,
              fontWeight: '900',
              fontSize: '20px',
              }}>
              mdb
            </Typography>

            </Box>

            <IconButton
            onClick={()=>{
              dispatch(switchTheme(isLight))
            }}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
            >
              { ( isLight ? <DarkModeIcon /> : <LightModeIcon /> ) }
            </IconButton>

            <IconButton
            onClick={handleOpenPopover}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
            ><TranslateIcon />
            </IconButton>
          <IconButton
          component={RouterLink}
          to='account'
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              </Box>
        </Toolbar>
      </AppBar>


      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            padding: 1,
            maxWidth: 200,
          },
        }}
      >
        <Stack>
        
        <IconButton
        sx={{
          display:'flex',
          alignItems:'center',
          width:'40px',
          height:'40px',
          margin:'3px'
        }}
        onClick={()=>{
          dispatch(switchLang('ru'))
        }}
          // aria-label="account of current user"
          // aria-controls="menu-appbar"
          // aria-haspopup="true"
          color="inherit"
        ><Typography sx={{fontSize:'25px'}} variant='p'>🇷🇺</Typography></IconButton>
        
        <IconButton
        onClick={()=>{
          dispatch(switchLang('en-US'))
        }}
        sx={{
          display:'flex',
          alignItems:'center',
          width:'40px',
          height:'40px',
          margin:'3px'
        }}
          // aria-label="account of current user"
          // aria-controls="menu-appbar"
          // aria-haspopup="true"
          color="inherit"
        ><Typography sx={{fontSize:'25px'}} variant='p'>🇬🇧</Typography></IconButton>
        </Stack>


      </Popover>


    </Box>
  );
}

Header = connect()(Header)

export default Header