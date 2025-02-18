import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Box, Button, CardMedia, Paper, Typography } from "@mui/material";
import Detail from "../Detail";
import { useCookies } from "react-cookie";
import GradeIcon from '@mui/icons-material/Grade';
import { useSelector } from "react-redux";
import { description, rate_counts } from "../lang";

export default function Movie(){

    const lang = useSelector(state => state.switchLang)
    
    const [details, setDetails] = useState('');
    const [credits, setCredits] = useState('');
    const movie = useParams();
    const [cookies] = useCookies(['user']);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    useEffect(() => {

        const url = `https://api.themoviedb.org/3/movie/${movie.movieId}?language=${lang}`;
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
            setDetails(json)
        })
          .catch(err => console.error(err));
        
    }, [movie.movieId, lang, cookies.token]);

    useEffect(() => {

        const url = `https://api.themoviedb.org/3/movie/${movie.movieId}/credits?language=${lang}`;
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
            setCredits(json)
        })
          .catch(err => console.error(err));
        
    }, [movie.movieId, lang,cookies.token]);


    return cookies.token && (
        <Box
        sx={{
            boxSizing: 'border-box',
            padding: '20px',
            width:'100%',
            maxWidth:'720px',
            display:'flex',
            flexDirection:'column',
            gap:'20px',
        }}
        >
            
            <Box
            sx={{
                width:'100%',
                display:'flex',
            }}>
                <Paper
                sx={{
                    width:'100%',
                overflow:'hidden',
                }}>
                <CardMedia
                component="img"
                sx={{
                }}
                image={`https://image.tmdb.org/t/p/w780${details.poster_path}`}
                alt={details.title} />
                </Paper>

                {/* <Box
                    sx={{
                        boxSizing:'border-box',
                        padding:'10px 10px'
                    
                    }}
                >
                    {details.production_companies && 
                    details.production_companies.map((company)=>(
                        company.logo_path &&
                            <CardMedia
                            key={company.id}
                                component="img"
                                sx={{
                                    marginTop:'20px',
                                    width:'100px',
                                }}
                                image={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                                alt={company.name} 
                            />
                    ))}
                </Box> */}
                
            </Box>

            <Box>
                <h1>{details.title + ' (' + (new Date(details.release_date)).getFullYear() + ')'}</h1>
                <p>{details.original_title}</p>

                {/* Рейтинг */}
                <Typography
                variant="h2"
                    sx={{
                    color:'text.pastel',
                    fontWeight:'900',
                    fontSize:'50px',
                    margin:'20px 0px'}}
                >{Math.round(details.vote_average*10)/10}
                    <Typography
                        variant="span"
                        sx={{
                        color:'text.primary',
                        fontWeight:'normal',
                        fontSize:'15px',
                        marginLeft:'10px'}}
                    >
                        {String(details.vote_count)} {rate_counts(lang)}
                    </Typography>
                </Typography>

        <Button
        variant="contained"
        href={`https://rutracker.org/forum/tracker.php?nm=${details.title}`}
        target="_blank"
        rel="noopener noreferrer"
        color="white"
        >
            
            <GradeIcon sx={{width:'15px', color:"red"}}/>
            <GradeIcon sx={{width:'20px', color:"green", transform:'translateX(-8px)'}}/>
            <GradeIcon sx={{width:'25px', color:"blue", transform:'translateX(-20px)'}}/>

            <Typography
            variant="span"
            sx={{
                color:'red',
                fontWeight:'bold',
                fontSize:'12px',
                textTransform: 'none',
                transform:'translateX(-15px)'
            }}
            >ru
            <span style={{color:'green'}}
            >tracker</span>
            </Typography>
        </Button>

                <Box
                sx={{
                    display:'flex',
                }}>
                    <Box
                    sx={{
                        flex:1,
                    }}>
                        <h4>В главных ролях</h4>
                        <ul style={{paddingLeft:'20px'}}>
                            {credits.cast && credits.cast.map((i, index)=>(
                                (index<10) &&
                                <li key={i.id}>{i.name}</li>
                            ))}
                        </ul>
                    </Box>

                    <Box
                    sx={{
                        flex:1,
                        marginLeft:'40px',
                    }}>
                        {credits.cast && credits.cast
                        .filter(i => i.known_for_department === 'Directing')
                        .length > 0 && (
                            <>
                                <h4>Режиссер</h4>
                                <ul style={{paddingLeft:'20px'}}>{
                                credits.cast && credits.cast.map((i, index)=>
                                (
                                    i.known_for_department === 'Directing' && 
                                    <li key={i.id}>{i.name}</li>
                                ))}
                                    </ul>
                            </>
                        )}

                        {credits.cast && credits.cast
                        .filter(i => i.known_for_department === 'Writing')
                        .length > 0 && (
                            <>

                        <h4>Сценарий</h4>
                        <ul style={{paddingLeft:'20px'}}>{credits.cast && credits.cast.map((i, index)=>
                        (
                            i.known_for_department === 'Writing' && 
                            <li key={i.id}>{i.name}</li>
                        ))}</ul>
                            </>
                        )}
                    </Box>
                </Box>


                <Box
                sx={{
                }}>
                    

                    <Detail title={'Страна'}>{details && details.production_countries.map((i)=>(<div key={i.name}>{i.name}</div>))}</Detail>
                    <Detail title={'Жанр'}>{details && details.genres.map((i)=>(<div key={i.id}>{i.name}</div>))}</Detail>
                    <Detail title={'Слоган'}>{details.tagline}</Detail>
                    <Detail title={'Бюджет'}>{'$ ' + String(details.budget).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</Detail>
                    <Detail title={'Сборы'}>{'$ ' + String(details.revenue).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</Detail>
                    
                </Box>
                
                <h4 style={{margin:'40px 0px 0px 0px'}}>{description(lang)}:</h4>
                <p>{details.overview}</p>
            </Box>
            
        </Box>
    )
}