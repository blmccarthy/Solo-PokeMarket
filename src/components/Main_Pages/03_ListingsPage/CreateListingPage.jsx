import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';







function CreateListingPage() {

    const dispatch = useDispatch();
    const conditions = useSelector(store => store.conditions)

    const [newCardName, setNewCardName] = useState('');
    const [newSet, setNewSet] = useState('');
    const [newCondition, setNewCondition] = useState('');
    const [newAskingPrice, setNewAskingPrice] = useState('');
    const [isGraded, setIsGraded] = useState('');
    const [newGradingService, setNewGradingService] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newNotes, setNewNotes] = useState('');
    const [isOfferEligible, setIsOfferEligible] = useState('');
    const [isTradeEligible, setIsTradeEligible] = useState('');

    const handleSubmit = () => {
        dispatch({
            type: 'POST_LISTING',
            payload: {
                card_name: newCardName,
                set: newSet,
                condition: newCondition,
                asking_price: newAskingPrice,
                graded: isGraded,
                grading_service: newGradingService,
                image_url: newImage,
                notes: newNotes,
                offer_eligible: isOfferEligible,
                trade_eligible: isTradeEligible
            }
        })
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_CONDITIONS' })
    }, [])

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
                        value={newCardName}
                        onChange={(event) => setNewCardName(event.target.value)}
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
                        value={newSet}
                        onChange={(event) => setNewSet(event.target.value)}
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
                            value={newCondition}
                            label="Condition"
                            onChange={(event) => setNewCondition(event.target.value)}
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
                            value={newAskingPrice}
                            onChange={(event) => setNewAskingPrice(event.target.value)}
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
                            value={isGraded}
                            label="is-graded"
                            onChange={(event) => setIsGraded(event.target.value)}
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
                            value={newGradingService}
                            label="Grading Service"
                            onChange={(event) => setNewGradingService(event.target.value)}
                            required
                        >
                            {conditions.map(condition => (
                                <MenuItem key={condition.id} value={condition.id}>{condition.description}</MenuItem>
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
                        value={newImage}
                        onChange={(event) => setNewImage(event.target.value)}
                        fullWidth
                    />
                </Grid>
                {/* === NOTES ============================================================================================== */}
                <Grid item xs={12}>
                    <TextField
                        id="outlined-required"
                        label="Notes"
                        autoComplete="off"
                        value={newNotes}
                        onChange={(event) => setNewNotes(event.target.value)}
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
                    <FormControl fullWidth sx={{ mb: 1 }}>
                        <InputLabel id="is-offer-eligible">Open to Offers?</InputLabel>
                        <Select
                            labelId="is-offer-eligible"
                            id="is-offer-eligible"
                            value={isOfferEligible}
                            label="is-offer-eligible"
                            onChange={(event) => setIsOfferEligible(event.target.value)}
                            required
                        >
                            <MenuItem key="true" value="true">Yes</MenuItem>
                            <MenuItem key="false" value="false">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* === TRADE ELIGIBLE ===================================================================================== */}
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ mb: 1 }}>
                        <InputLabel id="is-trade-eligible">Open to Trades?</InputLabel>
                        <Select
                            labelId="is-trade-eligible"
                            id="is-trade-eligible"
                            value={isTradeEligible}
                            label="is-trade-eligibl"
                            onChange={(event) => setIsTradeEligible(event.target.value)}
                            required
                        >
                            <MenuItem key="true" value="true">Yes</MenuItem>
                            <MenuItem key="false" value="false">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>







                {/* === SUBMIT BUTTON =================================================================================== */}
                <Grid item xs={12}>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        sx={{ position: 'static' }}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default CreateListingPage;