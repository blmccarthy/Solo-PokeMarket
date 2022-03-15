import './SearchBar.css'

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';


function SearchBar() {

    return (
        <div className="searchbar">
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '88%' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search ..."
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>

            </Paper>
        </div>
    )
}

export default SearchBar;