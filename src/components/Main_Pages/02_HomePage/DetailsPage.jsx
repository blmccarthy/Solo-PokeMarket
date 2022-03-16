import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

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

    const listings = useSelector(store => store.listings.listingReducer);
    const selectedItem = listings.filter(listing => listing.id == id)[0];

    const handleBack = () => {
        console.log('in go back');
        history.push('/home');
    }

    const handleSendOffer = () => {
        console.log('I do nothing right now, stay tuned...');
    }

    console.log(selectedItem);

    return (
        <div>
            <img src="https://i.imgur.com/tbsB1DK.png" alt="Zardo" />

            <Container sx={{ my: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 100, letterSpacing: -1 }}>{selectedItem.card_name}</Typography>
                <Typography variant="h5">${selectedItem.asking_price}</Typography>
            </Container>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="left"><b>Details</b></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">Set</TableCell>
                            <TableCell align="right">{selectedItem.set}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">Condition</TableCell>
                            <TableCell align="right">{selectedItem.condition}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">Graded</TableCell>
                            <TableCell align="right">{selectedItem.graded ? <CheckCircleRoundedIcon/> : <RadioButtonUncheckedRoundedIcon/> }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">Offer Eligible</TableCell>
                            <TableCell align="right">{selectedItem.offer_eligible ? <CheckCircleRoundedIcon/> : <RadioButtonUncheckedRoundedIcon/> }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">Trade Eligible</TableCell>
                            <TableCell align="right">{selectedItem.trade_eligible ? <CheckCircleRoundedIcon/> : <RadioButtonUncheckedRoundedIcon/> }</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid container spacing={2} sx={{ mb: 3, mt: 1 }}>
                <Grid item xs={6}>
                    <Button variant="outlined" onClick={handleBack} sx={{ width: "100%" }} >Go Back</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={handleSendOffer} sx={{ width: "100%" }}>Send Offer</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Details;