import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './_HomePage.css';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';



function Details() {

    // store page params
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const conditions = useSelector(store => store.conditions)
    const listings = useSelector(store => store.listings.listingReducer);
    const images = useSelector(store => store.listings.imageReducer);
    const user = useSelector(store => store.user);

    const selectedItem = listings.filter(listing => listing.id == id)[0];
    const selectedImage = images.filter(image => image.listing_id == id)[0];

    const handleBack = () => {
        console.log('in go back');
        history.push('/home');
    }

    const handleSendOffer = () => {
        console.log('I do nothing right now, stay tuned...');
    }

    const handleEdit = () => {
        history.push(`/edit/${selectedItem.id}`)
    }

    return (
        <div>
            <div className="detail-img">
                <img src={selectedImage.url} alt={selectedItem.card_name} />
            </div>

            {/* <Container sx={{ my: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 100, letterSpacing: -1 }}>{selectedItem.card_name}</Typography>
                <Typography variant="h6" sx={{ mt: 1 }}><b>${selectedItem.asking_price}</b></Typography>
            </Container> */}

            <TableContainer /* component={Paper} */ sx={{ mt: 2 }}>
                <Table aria-label="details-table" size="small">
                    <TableHead>
                        <TableRow >
                            <TableCell align="left" sx={{ fontSize: 24, pb: 2 }}><b>{selectedItem.card_name}</b></TableCell>
                            <TableCell align="right" sx={{ fontSize: 24, pb: 2 }}>${selectedItem.asking_price}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell align="left" sx={{ py: 1.3 }}>Set</TableCell>
                            <TableCell align="right">{selectedItem.set}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left" sx={{ py: 1.3 }}>Condition</TableCell>
                            <TableCell align="right">{(conditions.filter(c => c.id == selectedItem.condition)[0]).description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left" sx={{ py: 1.3 }}>Graded</TableCell>
                            <TableCell align="right">{selectedItem.graded ? <CheckCircleRoundedIcon /> : <RadioButtonUncheckedRoundedIcon />}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left" sx={{ py: 1.3 }}>Open to Offers</TableCell>
                            <TableCell align="right">{selectedItem.offer_eligible ? <CheckCircleRoundedIcon /> : <RadioButtonUncheckedRoundedIcon />}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left" sx={{ py: 1.3 }}>Open to Trades</TableCell>
                            <TableCell align="right">{selectedItem.trade_eligible ? <CheckCircleRoundedIcon /> : <RadioButtonUncheckedRoundedIcon />}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left" sx={{ py: 1.3}}>Seller Notes:</TableCell>
                            <TableCell align="left">{selectedItem.notes}</TableCell>
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
                {user.id == selectedItem.user_id 
                    ? <Button variant="contained" onClick={handleEdit} sx={{ width: "100%", position: 'static' }}>Edit</Button>
                    : <Button variant="contained" onClick={handleSendOffer} sx={{ width: "100%", position: 'static' }}>Send Offer</Button>}
                </Grid>
            </Grid>
        </div>
    )
}

export default Details;