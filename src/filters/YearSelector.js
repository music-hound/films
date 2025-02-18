import { Typography, Slider, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { changeYear } from '../state/actions';
import { yearMax, yearMin } from '../state/reducers';
import { release_year } from '../lang';

export default function YearSelector(){

  const year = useSelector(state => state.changeYear);
  const lang = useSelector(state => state.switchLang);
  
  const dispatch = useDispatch();

  return (
      <>
      <Typography
      
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: '400',
            fontSize:'16px',
            }}>
            {release_year(lang)}
        </Typography>

        <Box>
        <Slider
        sx={{
          maxWidth:'300px',
          minWidth:'260px',
        }}
        min={yearMin}
        max={yearMax}
          getAriaLabel={() => 'Release year range'}
          value={year}
          onChange={(e)=>{
            dispatch(changeYear(e.target.value))
          }}
          valueLabelDisplay='auto'
        />
        </Box>
        </>
  )
}