import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';
import { sort_with } from '../lang';
import { useDispatch, useSelector } from 'react-redux';
import { changeSort, switchDesc } from '../state/actions';
import { IconButton, Tooltip } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function SortSelect(){

  const lang = useSelector(state => state.switchLang)
  const sort = useSelector(state => state.changeSort)
  const isDescending = useSelector(state => state.switchDesc)

  const dispatch = useDispatch();

  const sortTypes = [
    {
        id:0,
        label : 'Популярности',
        value : 'popularity',
    },
    {
        id:1,
        label : 'Оценке',
        value : 'vote_average',
    },
    {
        id:2,
        label : 'Дате выхода',
        value : 'primary_release_date',
    },
    {
        id:3,
        label : 'Количеству оценок',
        value : 'vote_count',
    },
    {
        id:4,
        label : 'Названию',
        value : 'title',
    },
    {
        id:5,
        label : 'Оригинальному названию',
        value : 'original_title',
    },
    {
        id:6,
        label : 'Сумме проката',
        value : 'revenue',
    },
]


    return (
        <Box sx={{
          maxWidth:'300px',
          minWidth:'260px',
          position:'relative',
          }}>
            
        <FormControl
        fullWidth
        sx={{
          width:'90%'
        }}
        >

          <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {sort_with(lang)}
          </InputLabel>

          <NativeSelect
          value={sort}
          onChange={(e)=>{
            dispatch(changeSort(e.target.value))
          }}
            inputProps={{
              name: 'sortWith',
              id: 'uncontrolled-native',
            }}
          >
            
            {sortTypes.map((type)=>(
              <option key={type.id} value={type.value}>{type.label}</option>
            ))}
            
            </NativeSelect>

        </FormControl>
        <Tooltip title={
          isDescending ? 
              'По убыванию'
            :
              'По возрастанию'
          } arrow>
        <IconButton
        sx={{
          position:'absolute',
          right:'-10px',
          top:'10px',
        }}
        onClick={() => dispatch(switchDesc())}
        >
          {
          isDescending ? 
              <ArrowDownwardIcon />
            :
              <ArrowUpwardIcon />
          }

        </IconButton>
        </Tooltip>

      </Box>

    )
}