import './SearchBar.css'
import { useEffect, useState } from 'react';
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
    const user = useSelector(store => store.user)
    const searchQuery = useSelector(store => store.filters.searchQueryReducer.card_name)   

    const [searchField, setSearchField] = useState(searchQuery)


    // Returns ALL listings if there is no search query
    useEffect(() => {
        dispatch({ type: 'FETCH_LISTINGS' });
    }, [])


    const handleSearch = (event) => {
        event.preventDefault();

        setSearchField(event.target.value)

        if (event.target.value.length > 0) {
            dispatch({ type: 'FETCH_SEARCH', payload: {card_name: event.target.value} })
        }
        else {
            dispatch({ type: 'FETCH_LISTINGS' });
        }
    }

    const handleSearchClick = (event) => {
        event.preventDefault();
        history.push('/home');
        setSearchField('');
    }

    console.log('searchQuery', searchQuery);

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
                        value={searchField}
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