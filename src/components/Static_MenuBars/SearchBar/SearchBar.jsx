import './SearchBar.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import pokeball_logo from './pokeball.png'

function SearchBar() {

    const dispatch = useDispatch();
    const history = useHistory();
    const searchQuery = useSelector(store => store.filters.searchQueryReducer)
    const user = useSelector(store => store.user)

    const handleSearch = (event) => {
        event.preventDefault();
        // Sets Search Query Reducer
        dispatch({ type: 'SET_FILTER', payload: { property: 'card_name', value: event.target.value } })
        if (searchQuery.card_name) {
            dispatch({ type: 'FETCH_SEARCH', payload: searchQuery })
        }
    }


    // TODO: only for testing FETCH_SEARCH
    // ! // For whatever reason, FETCH Search runs twice. Troubleshooting....
    // useEffect(() => {
    //     console.log('in useEffect', searchQuery.card_name.length);
    //     // dispatch({ type: 'FETCH_SEARCH', payload: searchQuery})
    // }, [searchQuery.card_name.length])
    // ! // ------------------------------------------------------------------


    // Returns ALL listings if there is no search query
    useEffect(() => {
        dispatch({ type: 'FETCH_LISTINGS' });
    }, [])


    const handleSearchClick = (event) => {
        event.preventDefault();
        history.push('/')
    }

    console.log('user', user);

    return (
        <div className="searchbar">
            {user.id ?
                <Paper
                    component="form"
                    onSubmit={(event) => handleSearchClick(event)}
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '88%' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search ..."
                        // value={searchQuery.card_name}
                        onChange={event => handleSearch(event)}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>

                </Paper>
                :
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h4" sx={{ fontFamily: 'Varela Round', letterSpacing: 6 }}>P</Typography>
                    <img src={pokeball_logo} alt="pokeball logo" className="pokeball-logo" />
                    <Typography variant="h4" sx={{ fontFamily: 'Varela Round', letterSpacing: 6 }}>KÉBAY</Typography>
                </Box>
            }
        </div>
    )
}

export default SearchBar;