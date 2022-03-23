import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ReviewOffersPage() {

    // ----- Modal Functions -----------------------------------

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // ----------------------------------------------------------

    const dispatch = useDispatch();
    const user = useSelector(store => store.user)
    const images = useSelector(store => store.listings.imageReducer)
    const conditions = useSelector(store => store.conditions)
    const incomingOffers = useSelector(store => store.offers.incomingOffersReducer)
    const outgoingOffers = useSelector(store => store.offers.outgoingOffersReducer)
    const [offerType, setOfferType] = useState('')

    const handleDeclineOffer = () => {
        console.log('listing.id', listing.id);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_INCOMING_OFFERS' });
        dispatch({ type: 'FETCH_OUTGOING_OFFERS' });
    }, [])

    return (

        // ================================================================================================================== 
        //     BUTTON GROUP
        // ==================================================================================================================

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
            ================================================================================================================== 
                CONDITIONAL RENDERING : Incoming 
            ==================================================================================================================
            */}

            {offerType == 'incoming' &&
                (incomingOffers.map((listing, i) => (
                    <div
                        value={listing.id}
                        key={i}
                    // onClick={handleListingClick}
                    >
                        <Grid container spacing={3} sx={{ py: 0.5 }}>
                            <Grid item xs={5}>
                                <div className="home_img">
                                    <img src={(images.filter(image => image.listing_id == listing.id)[0])?.url} />
                                </div>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography ><b>{listing.card_name}</b></Typography>
                                <Box>
                                    <Typography>Set: {listing.set}</Typography>
                                    <Typography>Condition: {(conditions?.filter(c => c.id == listing?.condition)[0])?.description}</Typography>
                                    <Typography>Asking Price: ${listing.asking_price}</Typography>
                                    <br />
                                    {listing.offer_type == 'offer' &&
                                        <Typography><b>Offer Request</b></Typography>
                                    }
                                    {listing.offer_type == 'trade' &&
                                        <Typography><b>Trade Request</b></Typography>
                                    }
                                    {listing.offer_amount &&
                                        <Typography>Offer: {listing?.offer_amount}</Typography>
                                    }
                                    {listing.trade_desc &&
                                        <Typography>Buyer Notes: {listing?.trade_desc}</Typography>
                                    }


                                </Box>
                            </Grid>
                        </Grid>

                        {/* ------- ACCEPT / DECLINE BUTTONS ------------------------------------------------------- */}

                        {listing.status == 'pending' &&
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={6}>
                                    <Button variant="outlined" color='success' fullWidth onClick={handleClickOpen}>Accept</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="outlined" color='warning' fullWidth onClick={handleDeclineOffer}>Decline</Button>
                                </Grid>
                            </Grid>
                        }
                        <Box sx={{ my: 4 }}>
                            <hr />
                        </Box>

                        {/* ------- SHOW STATUS -------------------------------------------------------------------- */}

                        {listing.status != 'pending' &&
                            <Typography>Status: {listing.status}</Typography>
                        }

                        {/* ------- MODAL RENDERING ---------------------------------------------------------------- */}

                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{"Accept this offer?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    You're once click away from solidifying the deal!
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleClose}>Accept</Button>
                            </DialogActions>
                        </Dialog>



                    </div>
                )))
            }
        </>
    )
}

export default ReviewOffersPage;