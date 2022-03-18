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
            { type: 'FETCH_SELECTED_LISTING', payload: id },
            { type: 'FETCH_CONDITIONS' },
            { type: 'FETCH_GRADING_SERVICES' },
            { type: 'FETCH_LISTING_IMAGES' },
        )
    }, []);

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user)
    const conditions = useSelector(store => store.conditions)
    const gradingServices = useSelector(store => store.gradingServices)
    const selectedListing = useSelector(store => store.listings.selectedListingReducer)
    const images = useSelector(store => store.listings.imageReducer)
    const selectedImage = images.filter(image => image.listing_id == id)[0];


    const [newCardName, setNewCardName] = useState(selectedListing.card_name);
    const [newSet, setNewSet] = useState(selectedListing.set);
    const [newCondition, setNewCondition] = useState(selectedListing.condition);
    const [newAskingPrice, setNewAskingPrice] = useState(selectedListing.asking_price);
    const [isGraded, setIsGraded] = useState(selectedListing.graded);
    const [newGradingService, setNewGradingService] = useState(selectedListing.grading_service);
    // const [newImage, setNewImage] = useState(selectedImage.url);
    const [newNotes, setNewNotes] = useState(selectedListing.notes);
    const [isOfferEligible, setIsOfferEligible] = useState(selectedListing.offer_eligible);
    const [isTradeEligible, setIsTradeEligible] = useState(selectedListing.trade_eligible);

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
        dispatch({ type: 'DELETE_LISTING', payload: id})
        history.push('/my-listings')
    }

    console.log('selectedListing:', selectedListing);
    console.log('selectedListing.card_name:', selectedListing.card_name);
    console.log('newCardName:', newCardName);

    return (
        <>
            {/* === BASIC DETAIL ======================================================================================= */}
            <div className="typography-block">
                <Typography variant="h5" sx={{ fontWeight: 100 }} xs={12}>Basic Detail</Typography>
                <hr />
            </div>
            <Grid container rowSpacing={2} columnSpacing={2} sx={{ mb: 4 }}>
                {/* === CARD NAME ====================================================================================== */}
                
                <input value={selectedListing.card_name} />

                {/* <Grid item xs={12}>
                    <TextField
                        label="Card Name"
                        autoComplete="off"
                        defaultValue={newCardName}
                        onChange={(event) => setNewCardName(event.target.value)}
                        required
                        fullWidth
                    />
                </Grid> */}
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
                        // value={newImage}
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
                    <FormControl fullWidth sx={{ mb: 4 }}>
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
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <InputLabel id="is-trade-eligible">Open to Trades?</InputLabel>
                        <Select
                            labelId="is-trade-eligible"
                            id="is-trade-eligible"
                            value={isTradeEligible}
                            label="is-trade-eligible"
                            onChange={(event) => setIsTradeEligible(event.target.value)}
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