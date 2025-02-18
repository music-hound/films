import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { movie_name } from '../lang'
import { useDispatch, useSelector } from "react-redux";
import { searchInput } from "../state/actions";

export default function SearchBar(){

    const lang = useSelector(state => state.switchLang);
    const search_input = useSelector(state => state.searchInput);
    const dispatch = useDispatch()

    return (
    
        <Box
        component={'form'}
        style={{
            maxWidth:'300px',
            minWidth:'260px',
            position:'relative',
        }}
        onSubmit={(event)=>{
            event.preventDefault()
            }}
        >
            <TextField
            value={search_input}
            onChange={(e)=>{
                if (e.target.value.trimStart()) {
                    dispatch(searchInput(e.target.value.trimStart()))
                } else {
                    dispatch(searchInput(''))
                }
            }}
            name='search'
            fullWidth
            aria-label="search"
            label={movie_name(lang)}
            />

            <IconButton 
            type="submit" 
            sx={{
                position:'absolute',
                right:'8px',
                top:'9px'
            }} 
            aria-label="search"
            >
                <SearchIcon />
            </IconButton>
        </Box>

    )
}