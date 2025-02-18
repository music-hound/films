import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import react_logo from './img/logoreact.png';
import redux_logo from './img/logoredux.png';
import router_logo from './img/logorouter.png';
import StackItem from './StackItem';

export default function Footer() {
  return (
    <Box
    sx={{
      p:4,
      width:'100%',
      textAlign:'center',
      backgroundColor: 'primary.footer',
    }}
    >
      <Typography
        fontSize={'12px'}
      color='#888'>
      Application MDB buit by me using following stack
    </Typography>
    <Box
    sx={{
      display:'flex',
      justifyContent:'center',
      gap:'20px',
      mt:2,
    }}>

      <StackItem
      title={'react'}
      image={react_logo}
      />
      <StackItem
      title={'react router'}
      image={router_logo}
      />
      <StackItem
      title={'react-redux'}
      image={redux_logo}
      />
    
    </Box>
    </Box>
  );
}
