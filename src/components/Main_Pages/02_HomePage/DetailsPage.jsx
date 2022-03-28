// React Imports --------------------------------------------------------------
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// Component --------------------------------------------------------------
import './_HomePage.css';

// MUI --------------------------------------------------------------
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

function Details() {

    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch({ type: 'FETCH_SELECTED_IMAGES', payload: id });
        dispatch({ type: 'FETCH_SELECTED_LISTING', payload: id });
        dispatch({ type: 'FETCH_CONDITIONS' });
    }, [])


    const conditions = useSelector(store => store.conditions)
    // const images = useSelector(store => store.listings.imageReducer);
    const user = useSelector(store => store.user);
    const selectedListing = useSelector(store => store.listings.selectedListingReducer)
    const selectedImage = useSelector(store => store.listings.selectedImageReducer)

    const handleBack = () => {
        console.log('in go back');
        history.push('/home');
    }

    const handleSendOffer = () => {
        console.log('I do nothing right now, stay tuned...');
        history.push(`/offer/${selectedListing.id}`)
    }

    const handleEdit = () => {
        dispatch({ type: 'FETCH_SELECTED_IMAGES', payload: id });
        dispatch({ type: 'FETCH_SELECTED_LISTING', payload: id });
        history.push(`/edit/${selectedListing.id}`)
    }

    return (
        <div>
            <div className="detail-img">
                <img src={selectedImage?.url} alt={selectedListing?.card_name} />
            </div>

            <TableContainer sx={{ mt: 2 }}>
                <Table aria-label="details-table" size="small">
                    <TableHead>
                        <TableRow >
                            <TableCell align="left" sx={{ fontSize: 24, pb: 2 }}><b>{selectedListing?.card_name}</b></TableCell>
                            <TableCell align="right" sx={{ fontSize: 24, pb: 2 }}>${selectedListing?.asking_price}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell align="left" sx={{ py: 1.3 }}>Set</TableCell>
                            <TableCell align="right">{selectedListing?.set}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left" sx={{ py: 1.3 }}>Condition</TableCell>
                            <TableCell align="right">{(conditions?.filter(c => c.id == selectedListing?.condition)[0])?.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left" sx={{ py: 1.3 }}>Graded</TableCell>
                            <TableCell align="right">{selectedListing?.graded ? <CheckCircleRoundedIcon /> : <RadioButtonUncheckedRoundedIcon />}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left" sx={{ py: 1.3 }}>Open to Offers</TableCell>
                            <TableCell align="right">{selectedListing?.offer_eligible ? <CheckCircleRoundedIcon /> : <RadioButtonUncheckedRoundedIcon />}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left" sx={{ py: 1.3 }}>Open to Trades</TableCell>
                            <TableCell align="right">{selectedListing?.trade_eligible ? <CheckCircleRoundedIcon /> : <RadioButtonUncheckedRoundedIcon />}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left" sx={{ py: 1.3}}>Seller Notes:</TableCell>
                            <TableCell align="left">{selectedListing?.notes}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* NOTE: Button Positions set to 'static' due to them overlapping my navbar by default */}
            <Grid container spacing={2} sx={{ mb: 3, mt: 1 }}>
                <Grid item xs={6}>
                    <Button variant="outlined" onClick={handleBack} sx={{ width: "100%", position: 'static' }} >Go Back</Button>
                </Grid>
                <Grid item xs={6}>
                {/* If this listing belongs to signed-in user, they will see [EDIT], else [SEND OFFER] */}
                {user.id == selectedListing?.user_id 
                    ? <Button variant="contained" onClick={handleEdit} sx={{ width: "100%", position: 'static' }}>Edit</Button>
                    : <Button variant="contained" onClick={handleSendOffer} sx={{ width: "100%", position: 'static' }}>Send Offer</Button>}
                </Grid>
            </Grid>
        </div>
    )
}

export default Details;