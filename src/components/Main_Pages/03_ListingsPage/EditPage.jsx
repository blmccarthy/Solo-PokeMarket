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
        dispatch(
            { type: 'FETCH_CONDITIONS' },
            { type: 'FETCH_GRADING_SERVICES' },
            { type: 'FETCH_LISTING_IMAGES' },
        )
    }, []);

    const history = useHistory();
    const dispatch = useDispatch();

    // USE SELECTOR
    const user = useSelector(store => store.user)
    const conditions = useSelector(store => store.conditions)
    const gradingServices = useSelector(store => store.gradingServices)
    const selectedListing = useSelector(store => store.listings.selectedListingReducer)
    const selectedImage = useSelector(store => store.listings.selectedImageReducer)
    // const images = useSelector(store => store.listings.imageReducer)

    // LOCAL STATE FROM USE SELECTOR
    // const [newImage, setNewImage] = useState(selectedImage.url);
    // const [newCardName, setNewCardName] = useState(selectedListing.card_name);
    // const [newSet, setNewSet] = useState(selectedListing.set);
    // const [newCondition, setNewCondition] = useState(selectedListing.condition);
    // const [newAskingPrice, setNewAskingPrice] = useState(selectedListing.asking_price);
    // const [isGraded, setIsGraded] = useState(selectedListing.graded);
    // const [newGradingService, setNewGradingService] = useState(selectedListing.grading_service);
    // const [newNotes, setNewNotes] = useState(selectedListing.notes);
    // const [isOfferEligible, setIsOfferEligible] = useState(selectedListing.offer_eligible);
    // const [isTradeEligible, setIsTradeEligible] = useState(selectedListing.trade_eligible);

    const handleUpdate = () => {
        dispatch({
            type: 'UPDATE_LISTING',
            payload: {
                id: id,
                card_name: newCardName,
                set: newSet,
                condition: newCondition,
                asking_price: newAskingPrice,
                graded: isGraded,
                grading_service: newGradingService,
                notes: newNotes,
                offer_eligible: isOfferEligible,
                trade_eligible: isTradeEligible,
                image_url: newImage
            }
        })
        setNewCardName('');
        setNewSet('');
        setNewCondition('');
        setNewAskingPrice('');
        setIsGraded('');
        setNewGradingService('');
        setNewImage('');
        setNewNotes('');
        setIsOfferEligible('');
        setIsTradeEligible('');

        history.push('/my-listings');
    }

    const handleCancel = () => {
        history.push('/my-listings')
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
                        sx={{ position: 'static' }}
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
                        sx={{ position: 'static' }}
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
                        sx={{ position: 'static' }}
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