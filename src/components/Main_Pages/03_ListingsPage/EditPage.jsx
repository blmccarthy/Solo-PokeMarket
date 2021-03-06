import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './_ListingPage.css'

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


function EditPage() {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch({ type: 'FETCH_CONDITIONS' });
        dispatch({ type: 'FETCH_GRADING_SERVICES' });
        dispatch({ type: 'FETCH_LISTING_IMAGES' });
        dispatch({ type: 'FETCH_SELECTED_LISTING', payload: id })
    }, []);

    const history = useHistory();
    const dispatch = useDispatch();

    // USE SELECTOR
    const conditions = useSelector(store => store.conditions)
    const gradingServices = useSelector(store => store.gradingServices)
    const selectedListing = useSelector(store => store.listings.selectedListingReducer)
    const selectedImage = useSelector(store => store.listings.selectedImageReducer)

    const handleUpdate = () => {
        dispatch({
            type: 'UPDATE_LISTING',
            payload: selectedListing
        })
        dispatch({
            type: 'UPDATE_IMAGE',
            payload: selectedImage
        })
        dispatch({
            type: 'FETCH_MY_LISTINGS'
        })
        history.goBack();
    }

    const handleCancel = () => {
        history.goBack();
    }

    const handleDelete = () => {
        dispatch({ type: 'DELETE_LISTING', payload: id })
        history.push('/my-listings')
    }

    return (
        <>
            {/* === BASIC DETAIL ======================================================================================= */}
            <div className="typography-block">
                <Typography variant="h5" sx={{ fontWeight: 100 }} xs={12}>Basic Detail</Typography>
                <hr />
            </div>
            <Grid container rowSpacing={2} columnSpacing={2} sx={{ mb: 4 }}>
                {/* === CARD NAME ====================================================================================== */}
                <Grid item xs={12}>
                    <TextField
                        label="Card Name"
                        autoComplete="off"
                        value={selectedListing.card_name}
                        onChange={e => dispatch(
                            { type: 'CHANGE_SELECTED_LISTING', payload: { property: 'card_name', value: e.target.value } }
                        )}
                        required
                        fullWidth
                    />
                </Grid>
                {/* === SET ============================================================================================ */}
                <Grid item xs={12}>
                    <TextField
                        id="outlined-required"
                        label="Set"
                        autoComplete="off"
                        value={selectedListing.set}
                        onChange={e => dispatch(
                            { type: 'CHANGE_SELECTED_LISTING', payload: { property: 'set', value: e.target.value } }
                        )}
                        required
                        fullWidth
                    />
                </Grid>
                {/* === CONDITION ====================================================================================== */}
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="condition">Condition</InputLabel>
                        <Select
                            labelId="condition"
                            id="condition"
                            label="Condition"
                            value={selectedListing.condition}
                            onChange={e => dispatch(
                                { type: 'CHANGE_SELECTED_LISTING', payload: { property: 'condition', value: e.target.value } }
                            )}
                            required
                        >
                            {conditions.map(condition => (
                                <MenuItem key={condition.id} value={condition.id}>{condition.description}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* === ASKING PRICE =================================================================================== */}
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="asking-price">Amount</InputLabel>
                        <OutlinedInput
                            id="asking-price"
                            type="number"
                            value={selectedListing.asking_price}
                            onChange={e => dispatch(
                                { type: 'CHANGE_SELECTED_LISTING', payload: { property: 'asking_price', value: e.target.value } }
                            )}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"
                            required
                        />
                    </FormControl>
                </Grid>
            </Grid>
            {/* === OPTIONAL DETAIL ======================================================================================= */}
            <div className="typography-block">
                <Typography variant="h5" sx={{ fontWeight: 100 }} xs={12}>Optional Detail</Typography>
                <hr />
            </div>
            <Grid container rowSpacing={2} columnSpacing={2} sx={{ mb: 4 }}>
                {/* === GRADED ======================================================================================== */}
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="is-graded">Graded?</InputLabel>
                        <Select
                            labelId="is-graded"
                            id="is-graded"
                            label="is-graded"
                            value={selectedListing.graded}
                            onChange={e => dispatch(
                                { type: 'CHANGE_SELECTED_LISTING', payload: { property: 'graded', value: e.target.value } }
                            )}
                            required
                        >
                            <MenuItem key="true" value="true">Yes</MenuItem>
                            <MenuItem key="false" value="false">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* === GRADING SERVICE ======================================================================================== */}
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="grading-service">Grading Service</InputLabel>
                        <Select
                            labelId="grading-service"
                            id="grading-service"
                            label="Grading Service"
                            value={selectedListing.grading_service}
                            onChange={e => dispatch(
                                { type: 'CHANGE_SELECTED_LISTING', payload: { property: 'grading_service', value: e.target.value } }
                            )}
                            required
                        >
                            {gradingServices.map(service => (
                                <MenuItem key={service.id} value={service.id}>({service.code}) {service.description}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* === IMAGE URL =========================================================================================== */}
                <Grid item xs={12}>
                    <TextField
                        id="outlined"
                        label="Image URL"
                        autoComplete="off"
                        value={selectedImage.url}
                        onChange={e => dispatch(
                            { type: 'CHANGE_SELECTED_IMAGE', payload: { property: 'url', value: e.target.value } }
                        )}
                        fullWidth
                    />
                </Grid>
                {/* === NOTES ============================================================================================== */}
                <Grid item xs={12}>
                    <TextField
                        id="outlined-required"
                        label="Notes"
                        autoComplete="off"
                        value={selectedListing.notes}
                        onChange={e => dispatch(
                            { type: 'CHANGE_SELECTED_LISTING', payload: { property: 'notes', value: e.target.value } }
                        )}
                        fullWidth
                        multiline
                        inputProps={{ maxLength: 144 }}
                    />
                </Grid>
            </Grid>
            {/* === SALE OPTIONS ========================================================================================== */}
            <div className="typography-block">
                <Typography variant="h5" sx={{ fontWeight: 100 }} xs={12}>Sale Options</Typography>
                <hr />
            </div>
            <Grid container rowSpacing={2} columnSpacing={2} sx={{ mb: 4 }}>
                {/* === OFFER ELIGIBLE ===================================================================================== */}
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <InputLabel id="is-offer-eligible">Open to Offers?</InputLabel>
                        <Select
                            labelId="is-offer-eligible"
                            id="is-offer-eligible"
                            label="is-offer-eligible"
                            value={selectedListing.offer_eligible}
                            onChange={e => dispatch(
                                { type: 'CHANGE_SELECTED_LISTING', payload: { property: 'offer_eligible', value: e.target.value } }
                            )}
                            required
                        >
                            <MenuItem key="true" value="true">Yes</MenuItem>
                            <MenuItem key="false" value="false">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* === TRADE ELIGIBLE ===================================================================================== */}
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <InputLabel id="is-trade-eligible">Open to Trades?</InputLabel>
                        <Select
                            labelId="is-trade-eligible"
                            id="is-trade-eligible"
                            label="is-trade-eligible"
                            value={selectedListing.trade_eligible}
                            onChange={e => dispatch(
                                { type: 'CHANGE_SELECTED_LISTING', payload: { property: 'trade_eligible', value: e.target.value } }
                            )}
                            required
                        >
                            <MenuItem key="true" value="true">Yes</MenuItem>
                            <MenuItem key="false" value="false">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>







                {/* === DELETE BUTTON =================================================================================== */}
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        fullWidth
                        color="warning"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Grid>
                {/* === CANCEL BUTTON =================================================================================== */}
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Grid>
                {/* === SUBMIT BUTTON =================================================================================== */}
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default EditPage;