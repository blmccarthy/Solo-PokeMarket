import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';



function OfferPage() {

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(
            { type: 'FETCH_SELECTED_LISTING', payload: id }
        )
    })

    const selectedListing = useSelector(store => store.listings.selectedListingReducer)

    const [offerType, setOfferType] = useState('')

    return (
        <>
            <Typography variant="h6" sx={{ fontWeight: 100, mb: 2 }}>Select an offer type:</Typography>
            <ButtonGroup 
                variant="outlined" 
                aria-label="outlined button group" 
                fullWidth
                onClick={(e) => setOfferType(e.target.value)}
                sx={{ mb: 2 }}
            >
                <Button value="purchase" variant={offerType == 'purchase' ? 'contained' : 'outlined'} >Purchase</Button>
                <Button value="offer" variant={offerType == 'offer' ? 'contained' : 'outlined'} >Offer</Button>
                <Button value="trade" variant={offerType == 'trade' ? 'contained' : 'outlined'} >Trade</Button>
            </ButtonGroup>

            {/* 
            ================================================================================================================== 
                Conditional Rendering base on Offer Type Selected  
            ==================================================================================================================
            */}

            {offerType == '' &&
                <Button variant="outlined">Go Back</Button>
            }
            {offerType == 'purchase' &&
                <h1>purchase</h1>
            }
            {offerType == 'offer' &&
                <h1>Offer</h1>
            }
            {offerType == 'trade' &&
                <h1>Trade</h1>
            }
        </>
    );
}

export default OfferPage;