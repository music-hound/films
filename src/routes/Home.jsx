import Filters from '../filters/Filters.js';
import Box from '@mui/material/Box';
import CardLayout from '../CardLayout.js';
import { useCookies } from 'react-cookie';
import Typography from '@mui/material/Typography';
import LayoutPagination from '../LayoutPagination.js';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home(){
  const [ cookies ] = useCookies(['user'])

  const viewportHeight = window.innerHeight;
  const height = viewportHeight-146-60;


  const menuIsOpen = useSelector(state => state.menuIsOpen)

    if (cookies.token) {return (
    <Box
    sx={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      alignSelf:'center',
      padding: '24px 20px 20px 20px',
      height:'fit-content',
      maxWidth:'720px',
    }}
    >
      { menuIsOpen && <Filters /> }

    <LayoutPagination />

    <CardLayout />

    <LayoutPagination sx={{mt:2}} />


  </Box>
  )} else {return (
    <Box
    sx={{
      padding: '44px 20px',
      height:`${height}px`,
      display:'flex',
      gap:'30px',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
    }}
    >

      <img
      style={{width:'20vw'}}
      src='../logo512.png'
      alt='logo'
      />
    
    <Typography
    variant='h4'
    sx={{
      fontSize:'30px',
    }}
    >
      Вы не вошли в аккаунт
    </Typography>
    <Button
    component={RouterLink}
    to='account'
    variant='contained'
    >Войти</Button>
    </Box>
  )}
}