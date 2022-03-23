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

function ListIncoming({listing}) {

    // ----- Modal Functions -----------------------------------

    const [openAcceptModal, setOpenAcceptModal] = useState(false);
    const [openDeclineModal, setOpenDeclineModal] = useState(false);

    // Opens 'ACCEPT' modal
    const handleClickAccept = () => {
        setOpenAcceptModal(true);
    };
    // Opens 'DECLINE' modal
    const handleClickDecline = () => {
        setOpenDeclineModal(true);
    };

    // Closes all modals
    const exitModal = () => {
        setOpenDeclineModal(false);
        setOpenAcceptModal(false);
    };

    // Accepts offer
    const handleModalAccept = () => {
        dispatch({ type: 'UPDATE_ACCEPT_OFFER', payload: listing.offer_id })
        console.log('in handleModalAccept');
        setOpenAcceptModal(false);
    }

    // Declines offer
    const handleModalDecline = () => {
        dispatch({ type: 'UPDATE_DECLINE_OFFER', payload: listing.offer_id })
        console.log('in handleModalDecline');
        setOpenDeclineModal(false);
    }

    // ----------------------------------------------------------

    const dispatch = useDispatch();
    const incomingOffers = useSelector(store => store.offers.incomingOffersReducer);
    const outgoingOffers = useSelector(store => store.offers.outgoingOffersReducer);
    const images = useSelector(store => store.listings.imageReducer)
    const conditions = useSelector(store => store.conditions)

    return (

        //================================================================================================================== 
        //    CONDITIONAL RENDERING : Incoming 
        //==================================================================================================================

        <div
            value={listing.id}
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
                            <Typography>Offer: ${listing?.offer_amount}</Typography>
                        }
                        {listing.trade_desc &&
                            <Typography>{listing?.trade_desc}</Typography>
                        }


                    </Box>
                </Grid>
            </Grid>

            {/* ------- ACCEPT / DECLINE BUTTONS ------------------------------------------------------- */}

            {listing.status == 'pending' &&
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <Button variant="outlined" color='success' fullWidth onClick={handleClickAccept}>Accept</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" color='warning' fullWidth onClick={handleClickDecline}>Decline</Button>
                    </Grid>
                </Grid>
            }

            {/* ------- SHOW STATUS -------------------------------------------------------------------- */}

            {listing.status == 'accepted' &&
                <Typography sx={{ textAlign: 'center', mt: 2, color: '#00ab06', fontWeight: 'bold' }}>✅ OFFER ACCEPTED</Typography>
            }
            {listing.status == 'declined' &&
                <Typography sx={{ textAlign: 'center', mt: 2, color: '#bf1d00', fontWeight: 'bold' }}>❌ OFFER DECLINED</Typography>
            }

            {/* ---- Divider --------- */}
            <Box sx={{ my: 4 }}> 
                <hr />
            </Box>

        
            {/* ------- MODAL RENDERING ---------------------------------------------------------------- */}


            {/* ------ ACCEPT DIALOGUE ------ */}
            <Dialog
                open={openAcceptModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={exitModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Accept this offer?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        You're once click away from solidifying the deal!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={exitModal}>Cancel</Button>
                    <Button
                        onClick={handleModalAccept}
                        value={listing.offer_id}
                    >
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ------ DECLINE DIALOGUE ------ */}
            <Dialog
                open={openDeclineModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={exitModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Decline this offer?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Once confirmed, this offer will be removed from the list!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={exitModal}>Cancel</Button>
                    <Button
                        onClick={handleModalDecline}
                        value={listing.offer_id}
                    >
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default ListIncoming;