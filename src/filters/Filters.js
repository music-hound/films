import CloseIcon from '@mui/icons-material/Close';
import SearchBar from './SearchBar';
import { Grid2, IconButton } from "@mui/material";
import Paper from '@mui/material/Paper';
import Genre from './Genre';
import SortSelect from './Select';
import YearSelector from './YearSelector';
import { useDispatch } from 'react-redux';
import { resetFilters } from '../state/actions';

export default function Filters( { sx } ){

    const dispatch = useDispatch();

    return (
      <Paper 
        elevation={1}
        sx={{
          ...sx,
          boxSizing:'border-box',
          position:'relative',
          height:'fit-content',
          padding: '20px 60px 20px 20px',
          mb:2,
        }}
      >
        <Grid2
        container
        spacing={3}
        >
          <Grid2><SearchBar /></Grid2>
          <Grid2><SortSelect /></Grid2>
          <Grid2><Genre /></Grid2>
          <Grid2><YearSelector /></Grid2>


          <IconButton
          sx={{
            position:'absolute',
            top:'10px',
            right:'10px',
          }}
              onClick={()=>{
                dispatch(resetFilters());
            }}
          >
            <CloseIcon />
          </IconButton>

          </Grid2>

          </Paper>
    )
  }


