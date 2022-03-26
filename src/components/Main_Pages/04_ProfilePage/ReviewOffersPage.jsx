import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import ListIncoming from './ListIncoming';
import ListOutgoing from './ListOutgoing';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

function ReviewOffersPage() {

    const dispatch = useDispatch();
    const incomingOffers = useSelector(store => store.offers.incomingOffersReducer)
    const outgoingOffers = useSelector(store => store.offers.outgoingOffersReducer)
    const [offerType, setOfferType] = useState('incoming');

    useEffect(() => {
        dispatch({ type: 'FETCH_INCOMING_OFFERS' });
        dispatch({ type: 'FETCH_OUTGOING_OFFERS' });
        dispatch({ type: 'FETCH_LISTING_IMAGES' });
        dispatch({ type: 'FETCH_CONDITIONS' });
    }, []);

    return (
        <>
            <Typography variant="h6" sx={{ fontWeight: 100, mb: 2 }}>Review Offers:</Typography>
            <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
                fullWidth
                onClick={(e) => setOfferType(e.target.value)}
                sx={{ mb: 4 }}
            >
                <Button
                    value="incoming"
                    variant={offerType == 'incoming' ? 'contained' : 'outlined'}
                >
                    Incoming
                </Button>
                <Button
                    value="outgoing"
                    variant={offerType == 'outgoing' ? 'contained' : 'outlined'}
                >
                    Outgoing
                </Button>
            </ButtonGroup>

            {/* 
            //================================================================================================================== 
            //    CONDITIONAL RENDERING : Incoming 
            //================================================================================================================== 
            */}

            {offerType == 'incoming' &&
                (incomingOffers.map((listing, i) => (
                    <ListIncoming key={i} listing={listing} />
                )))
            }

            {/* 
            //================================================================================================================== 
            //    CONDITIONAL RENDERING : Outgoing 
            //================================================================================================================== 
            */}

            {offerType == 'outgoing' &&
                (outgoingOffers.map((listing, i) => (
                    <ListOutgoing key={i} listing={listing} />
                )))
            }
            {/* <Button onClick={dispatch({ type: 'FETCH_INCOMING_OFFERS' })}></Button> */}
        </>
    )
}

export default ReviewOffersPage;