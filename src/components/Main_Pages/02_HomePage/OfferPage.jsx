// React ----------------------------------------------------
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// MUI ------------------------------------------------------
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';

//MUI Table ---------------------------------------------------
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// MUI Modal ------------------------------------------------
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// MUI Animation
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function OfferPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    const selectedListing = useSelector(store => store.listings.selectedListingReducer)
    const user = useSelector(store => store.user)
    const conditions = useSelector(store => store.conditions)

    useEffect(() => {
        dispatch({ type: 'FETCH_SELECTED_LISTING', payload: id });
        dispatch({ type: 'FETCH_CONDITIONS' });
    }, [])

    const [offerType, setOfferType] = useState('')
    const [offerAmount, setOfferAmount] = useState(null)
    const [tradeDesc, setTradeDesc] = useState('')
    const [offerDesc, setOfferDesc] = useState('')

    const handleCancel = () => {
        history.push(`/details/${id}`)
    }

    const handleSendOffer = () => {
        dispatch({
            type: 'POST_OFFER',
            payload: {
                listing_id: id,
                buyer_user_id: user.id,
                seller_user_id: selectedListing.user_id,
                offer_amount: offerAmount,
                notes: offerDesc,
                trade_desc: tradeDesc,
                offer_type: offerType,
                status: 'pending'
            }
        })
        history.goBack();
    }

    // ------ Modal Functions -----------------------

    const [isOpenPurchaseModal, setIsOpenPurchaseModal] = useState(false);
    const [isOpenOfferModal, setIsOpenOfferModal] = useState(false);
    const [isOpenTradeModal, setIsOpenTradeModal] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handlePurchase = () => {
        console.log('Purchase');
        setIsModalOpen(false);
    }


    return (

        // ================================================================================================================== 
        //     BUTTON GROUP
        // ==================================================================================================================

        <>
            <Typography variant="h6" sx={{ fontWeight: 100, mb: 2 }}>Select an offer type:</Typography>
            <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
                fullWidth
                onClick={(e) => setOfferType(e.target.value)}
                sx={{ mb: 4 }}
            >
                <Button
                    value="purchase"
                    variant={offerType == 'purchase' ? 'contained' : 'outlined'}
                >
                    Purchase
                </Button>
                <Button
                    value="offer"
                    variant={offerType == 'offer' ? 'contained' : 'outlined'}
                    disabled={!selectedListing.offer_eligible}
                >
                    Offer
                </Button>
                <Button
                    value="trade"
                    variant={offerType == 'trade' ? 'contained' : 'outlined'}
                    disabled={!selectedListing.trade_eligible}
                >
                    Trade
                </Button>
            </ButtonGroup>

            {/* 
            ================================================================================================================== 
                CONDITIONAL RENDERING : Selected Offer Type
            ==================================================================================================================
            */}

            {/* ----- NONE ----- */}

            {offerType == '' &&
                <Button variant="outlined" fullWidth onClick={handleCancel}>Cancel</Button>
            }

            {/* ----- PURCHASE ----- */}

            {offerType == 'purchase' &&
                <>
                    <TableContainer>
                        <Table aria-label="details-table" size="small">
                            <TableHead>
                                <TableRow >
                                    <TableCell align="left" sx={{ fontSize: 16, pb: 2 }}><b>Item</b></TableCell>
                                    <TableCell align="right" sx={{ fontSize: 16, pb: 2 }}>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell align="left" sx={{ py: 1.3 }}>
                                        {selectedListing?.card_name}<br />
                                        {selectedListing?.set}<br />
                                        {(conditions?.filter(c => c.id == selectedListing?.condition)[0])?.description}
                                    </TableCell>
                                    <TableCell align="right">$ {selectedListing?.asking_price}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="left" sx={{ py: 1.3 }}>Shipping:</TableCell>
                                    <TableCell align="right">$ 5.00</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="left" sx={{ py: 1.3 }}><b>Total:</b></TableCell>
                                    <TableCell align="right"><b>$ {Number(selectedListing?.asking_price) + 5}</b></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                            <Button variant="outlined" fullWidth onClick={handleCancel}>Cancel</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" fullWidth onClick={openModal}>Purchase</Button>
                        </Grid>
                    </Grid>
                </>
            }

            {/* ----- OFFER ----- */}

            {offerType == 'offer' &&
                <FormControl >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <InputLabel htmlFor="asking-price">Offer Amount</InputLabel>
                            <OutlinedInput
                                id="asking-price"
                                type="number"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="OfferAmount"
                                placeholder='0.00'
                                required
                                fullWidth
                                onChange={e => setOfferAmount(e.target.value)}
                            />

                        </Grid>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <TextField
                                id="outlined-required"
                                label="Additional Notes..."
                                autoComplete="off"
                                fullWidth
                                minRows={3}
                                multiline
                                inputProps={{ maxLength: 144 }}
                                value={tradeDesc}
                                onChange={e => setTradeDesc(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" fullWidth onClick={handleCancel}>Cancel</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" fullWidth onClick={handleSendOffer}>Send Offer</Button>
                        </Grid>
                    </Grid>
                </FormControl>
            }

            {/* ----- TRADE ----- */}

            {offerType == 'trade' &&
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ mb: 1 }}>
                        <TextField
                            id="outlined-required"
                            label="Trade Description..."
                            autoComplete="off"
                            fullWidth
                            minRows={3}
                            multiline
                            inputProps={{ maxLength: 144 }}
                            value={tradeDesc}
                            onChange={e => setTradeDesc(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" fullWidth onClick={handleCancel}>Cancel</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth onClick={handleSendOffer}>Send Trade Offer</Button>
                    </Grid>
                </Grid>
            }

            {/* ------ MODAL RENDERING ------------------------------- */}

            <Dialog
                open={isModalOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeModal}
                aria-describedby="alert-dialog-slide-description"
            >
                {offerType == 'purchase' &&
                    <>
                        <DialogTitle>{"Accept this offer?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                You're once click away from solidifying the deal!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeModal}>Cancel</Button>
                            <Button
                            onClick={handlePurchase}
                            value={id}
                            >
                                Purchase
                            </Button>
                        </DialogActions>
                    </>
                }
            </Dialog>
        </>
    );
}

export default OfferPage;