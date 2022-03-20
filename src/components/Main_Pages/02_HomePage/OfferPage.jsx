import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: 'FETCH_SELECTED_LISTING', payload: id });
        dispatch({ type: 'FETCH_CONDITIONS', payload: id });
    }, [])

    const conditions = useSelector(store => store.conditions)
    const selectedListing = useSelector(store => store.listings.selectedListingReducer)

    const [offerType, setOfferType] = useState('')

    const handleCancel = () => {
        console.log('in handleCancel');
        history.push(`/details/${id}`)
    }

    const handlePurchase = () => {
        console.log('in handlePurchase');
    }

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
                CONDITIONAL RENDERING : Selected Offer Type
            ==================================================================================================================
            */}

            {offerType == '' &&
                <Button variant="outlined">Go Back</Button>
            }


            {offerType == 'purchase' &&
                <>
                    <TableContainer sx={{ mt: 2 }}>
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
                            <Button variant="contained" fullWidth onClick={handlePurchase}>Purchase</Button>
                        </Grid>
                    </Grid>
                </>
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