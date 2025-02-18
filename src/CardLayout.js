import Grid2 from '@mui/material/Grid2';
import Card from './Card';
import { useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { loadFavorite } from './state/actions';

export default function CardLayout(){

    const lang = useSelector(state => state.switchLang)
    const page = useSelector(state => state.changePage)
    const years = useSelector(state => state.changeYear)
    const favorite = useSelector(state => state.loadFavorite)
    const sort = useSelector(state => state.changeSort)
    const isDescending = useSelector(state => state.switchDesc)
    const search_input = useSelector(state => state.searchInput)
    const selectGenreIds = useSelector(state => state.changeGenre)

    const dispatch = useDispatch();
    const [movies, setMovies] = useState([]);
    const [cookies] = useCookies(['user']);

    useEffect(() => {

      let url;

      const genreIdsList = selectGenreIds.map(genre => genre.id)

      if (search_input !== '')
        {
        url = `https://api.themoviedb.org/3/search/movie?query=${search_input}&include_adult=true&language=${lang}&page=${page}`;
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=${lang}&page=${page}&primary_release_date.gte=${years[0]}-01-01&primary_release_date.lte=${years[1]}-12-31&sort_by=${sort}.${isDescending ? 'desc' : 'asc'}&with_genres=${genreIdsList}`
      }

        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: cookies.token,
          }
        };

        fetch(url, options)
          .then(res => res.json())
          .then(json => {
            setMovies(json.results)
        })
          .catch(err => console.error(err));
        
        }, [sort, isDescending, selectGenreIds, years, page, lang, favorite, search_input, cookies.token]);

    useEffect(()=>{

      const url = `https://api.themoviedb.org/3/account/${cookies.accountId}/favorite/movies`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: cookies.token,
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(json => {
          dispatch(loadFavorite(json.results))
      })
        .catch(err => console.error(err));
      
      },[cookies.token, cookies.accountId, dispatch])

    return(
        <Grid2
        xl={2}
        container
        gap={'20px'}
        sx={{
          mt:'20px',
          height:'fit-content',
          width:'fit-content',
          display:'flex',
          justifyContent:'center'
        }}
        >
            {movies.map((movie) => (
                <Card
                movie={movie}
                key={movie.id}
                ></Card>
            ))}
        </Grid2>
    )
}