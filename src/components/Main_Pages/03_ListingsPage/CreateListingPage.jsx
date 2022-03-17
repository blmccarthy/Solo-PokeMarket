import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';





function CreateListingPage() {

    const dispatch = useDispatch();
    const conditions = useSelector(store => store.conditions)

    const [newCardName, setNewCardName] = useState('');
    const [newSet, setNewSet] = useState('');
    const [newCondition, setNewCondition] = useState('');
    const [newAskingPrice, setNewAskingPrice] = useState('');
    const [isGraded, setIsGraded] = useState('');
    const [newNotes, setNewNotes] = useState('');
    const [isOfferEligible, setIsOfferEligible] = useState('');
    const [isTradeEligible, setIsTradeEligible] = useState('');

    useEffect(() => {
        dispatch({ type: 'FETCH_CONDITIONS' })
    }, [])

    return (
        <>
            <Grid container rowSpacing={2}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="asking-price">Amount</InputLabel>
                        <OutlinedInput
                            id="asking-price"
                            type="number"
                            value={newAskingPrice}
                            onChange={(event) => setNewAskingPrice(event.target.value)}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"
                        />
                    </FormControl>
                </Grid>
                {/* === GRADED ======================================================================================== */}
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="is-graded">Graded</InputLabel>
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
                {/* === OFFER ELIGIBLE ===================================================================================== */}
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="is-offer-eligible">Open to Offers?</InputLabel>
                        <Select
                            labelId="is-offer-eligible"
                            id="is-offer-eligible"
                            value={isOfferEligible}
                            label="is-offer-eligibl"
                            onChange={(event) => setIsOfferEligible(event.target.value)}
                            required
                        >
                            <MenuItem key="true" value="true">Yes</MenuItem>
                            <MenuItem key="false" value="false">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* === TRADE ELIGIBLE ===================================================================================== */}
                <Grid item xs={12}>
                    <FormControl fullWidth>
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
                {/* === CARD NAME ====================================================================================== */}
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






                {/* === SUBMIT BUTTON =================================================================================== */}
                <Grid item xs={12}>
                    <Button variant="contained" fullWidth>Submit</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default CreateListingPage;