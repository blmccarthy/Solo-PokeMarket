// React Imports --------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import ListIncoming from './ListIncoming';
import ListOutgoing from './ListOutgoing';

// MUI --------------------------------------------------------------
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';

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
                <>
                    {incomingOffers.length == 0
                        ? // If No Incoming Offers
                        <Typography sx={{textAlign: 'center' }}>No Incoming Offers Found</Typography>
                        : // If Incoming Offers > 0
                        (incomingOffers.map((listing, i) => (
                            <ListIncoming key={i} listing={listing} />
                        )))
                    }
                </>
            }

            {/* 
            //================================================================================================================== 
            //    CONDITIONAL RENDERING : Outgoing 
            //================================================================================================================== 
            */}

            {offerType == 'outgoing' &&
                <>
                    {outgoingOffers.length == 0
                        ? // If No Outgoing Offers
                        <Typography sx={{textAlign: 'center' }}>No Outgoing Offers Found</Typography>
                        : // If Outgoing Offers > 0
                        (outgoingOffers.map((listing, i) => (
                            <ListOutgoing key={i} listing={listing} />
                        )))
                    }
                </>
            }

        </>
    )
}

export default ReviewOffersPage;