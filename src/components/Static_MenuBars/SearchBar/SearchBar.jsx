import './SearchBar.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';


function SearchBar() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [search, setSearch] = useState('')

    const handleSearch = (event) => {
        event.preventDefault();
        dispatch({ type: 'FETCH_SEARCH', payload: search })
        history.push(`/home/filter/${search}`)
    }

    return (
        <div className="searchbar">
            <Paper
                component="form"
                onSubmit={(e) => handleSearch(e)}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '88%' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search ..."
                    // inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={e => setSearch(e.target.value)}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>

            </Paper>
        </div>
    )
}

export default SearchBar;