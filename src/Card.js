import {
    Paper, Grid2, Typography,
    CardMedia, Box, IconButton, Tooltip
} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import titleSizeFor from './titleSizeFor.js';
import { card_rating } from './lang.js';
import { useSelector } from 'react-redux';

export default function Card( { movie } ){

    const lang = useSelector(state => state.switchLang)
    const favorite = useSelector(state => state.loadFavorite)

    const [ cookies ] = useCookies(['user']);
    const [ isFavor, setIsFavor ] = useState()
    const [ hasError, setHasError ] = useState(false)

    useEffect( () => {
        setIsFavor(favorite.some((item)=>item.id === movie.id))
    },[favorite, movie.id])

    return (
        <Grid2>
            <Link
            style={{
                textDecoration:'none',}}
                to={`/movie/${movie.id}`}>
            <Paper
            sx={{
                borderRadius:'10px',
                position:'relative',
                wordWrap: 'break-word',
                overflow:'hidden',
                width:'155px',
                height:'330px',
            }}>

            <Box
            sx={{
                position:'absolute',
                top:'5px',
                left:'5px',
                backgroundColor:'background.paper',
                padding:'2px 3px',
                borderRadius:'5px'
            }}>
                <Typography
                sx={{
                    fontSize:'12px'
                }}>
                    {(new Date(movie.release_date)).getFullYear()}
                </Typography>
            </Box>

                <CardMedia
                component="img"
                sx={{
                    height:'220px'
                }}
                image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                />

                <Typography
                style={{
                    margin:'0',
                    padding:'10px 10px',
                    fontSize: `${titleSizeFor(movie.title)}px`,
                }}
                >
                    {movie.title}
                </Typography>

                <Box
                sx={{
                    padding:'0px 10px',
                    width:'100%',
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center',
                    position:'absolute',
                    bottom:0,
                }}>

                <Typography
                sx={{fontSize:'14px'}}
                >
                    {card_rating(lang) + Math.round(movie.vote_average*10)/10}
                </Typography>

               

                <IconButton
                sx={{
                    transform:'translateY(-5px)',
                }}
                onClick={(event)=>{
                    event.preventDefault()
                    setIsFavor(!isFavor)

                    //  Запрос на изменение списка фаворитов
                    fetch(`https://api.themoviedb.org/3/account/${cookies.accountId}/favorite`, {
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            'content-type': 'application/json',
                            Authorization: cookies.token,
                        },
                        body: JSON.stringify({media_type: 'movie', media_id: movie.id, favorite: !isFavor })
                        })
                    .then(res => res.json())
                    .then(json => {
                        setHasError(false);
                    })
                    .catch(err => {
                        console.error('Internet connection trouble!')
                        setHasError(true);
                    });
                    
                }}
                    color='default'
                >


                <Tooltip
                leaveDelay={3000}
                    open={hasError}
                    title="Ошибка интернет соединения!"
                    placement="top"
                    componentsProps={{
                        tooltip: {
                            sx: {
                                width:'80px',
                                bgcolor: 'error.main',
                                color: 'white',
                                textAlign:'center',
                                fontSize: '12px',
                                padding: '10px 5px',
                                borderRadius: '8px',
                                boxShadow: 3,
                            },
                        },
                        arrow: {
                            sx: {
                                color: 'error.main'
                            }
                        }
                    }}
                    arrow
                >
                    { hasError ?
                     ((isFavor) ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon color='error' />):
                     ((isFavor) ? <FavoriteIcon color='primary' /> : <FavoriteBorderIcon color='primary' />) }
                
                </Tooltip>
                
                </IconButton>
                </Box>
            </Paper>
            </Link>
        </Grid2>
       
    )
}