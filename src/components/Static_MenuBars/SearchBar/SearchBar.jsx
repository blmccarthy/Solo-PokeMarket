import './SearchBar.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';


function SearchBar() {

    const dispatch = useDispatch();
    const history = useHistory();
    const searchQuery = useSelector(store => store.filters.searchQueryReducer)

    const handleSearch = (event) => {
        event.preventDefault();
        // Sets Search Query Reducer
        dispatch({ type: 'SET_FILTER', payload: { property: 'card_name', value: event.target.value }})
        if (searchQuery.card_name) {
            dispatch({ type: 'FETCH_SEARCH', payload: searchQuery })
         } 
    }

    const handleSearchClick = (event) => {
        event.preventDefault();
        history.push('/')
    }


    
    // Returns ALL listings if there is no search query
    useEffect(() => {
        dispatch({ type: 'FETCH_LISTINGS' });
    }, [!searchQuery]) // Fetches all listings if nothing entered in search

    return (
        <div className="searchbar">
            <Paper
                component="form"
                onSubmit={(event) => handleSearchClick(event)}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '88%' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search ..."
                    onChange={event => handleSearch(event)}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>

            </Paper>
        </div>
    )
}

export default SearchBar;