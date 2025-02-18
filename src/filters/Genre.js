import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import firstLetterCapital from '../firstLetterCapital';
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { genre_list } from '../lang'
import { changeGenre } from '../state/actions';

export default function Genre(){

  const lang = useSelector(state => state.switchLang)
  const selectedGenres = useSelector(state => state.changeGenre)

  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [cookies] = useCookies(['user']); 

  useEffect(() => {

  const url = `https://api.themoviedb.org/3/genre/movie/list?language=${lang}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: cookies.token,
    }};

  let json;

  async function startFetching(){
    json = await fetch( url,options ).then(response => {return response.json()})

    setGenres(json.genres.map((genre)=>{
      return({
        ...genre,
        name : firstLetterCapital(genre.name),
      })
    }))
  }

  startFetching();

  }, [cookies.token, lang]);

  return (
    <Autocomplete
    sx={{
      maxWidth:'300px',
      minWidth:'260px',
    }}
      multiple
      id="checkboxes-tags-demo"
      options={genres}
      value={selectedGenres}
      getOptionLabel={(genre) => genre.name}
      onChange={
        (event, selectedGenres) => {
          dispatch(changeGenre(selectedGenres))}
      }
      disableCloseOnSelect
      renderOption={(props, genre, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {genre.name}
          </li>
        )
      }}
      renderInput={(params) => (
        <TextField {...params} label={genre_list(lang)} placeholder="Начните ввод.." />
      )}
    />
  );
}