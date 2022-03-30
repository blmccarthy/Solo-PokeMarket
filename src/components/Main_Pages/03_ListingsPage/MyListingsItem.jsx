// React Imports --------------------------------------------------------------
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// MUI --------------------------------------------------------------
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function ListingItem({ listing }) {

    const images = useSelector(store => store.listings.imageReducer)
    const conditions = useSelector(store => store.conditions)

    const history = useHistory();

    const handleListingClick = () => {
        history.push(`/details/${listing.id}`)
    }

    return (

        <div
            value={listing.id}
            onClick={handleListingClick}
        >
            <Grid container spacing={3} sx={{ py: 0.5 }}>
                <Grid item xs={5}>
                    <div className="home_img">
                        <img src={(images.filter(image => image.listing_id == listing.id)[0])?.url} />
                    </div>
                </Grid>
                <Grid item xs={7}>
                    <Typography sx={{ mb: 1 }}><b>{listing.card_name}</b></Typography>
                    <Box>
                        <Typography>Set: {listing.set}</Typography>
                        <Typography>Condition: {(conditions?.filter(c => c.id == listing?.condition)[0])?.description}</Typography>
                        <Typography>Graded: {listing.graded ? 'Yes' : 'No'}</Typography>
                        <Typography>Asking Price: ${listing.asking_price}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <hr />
        </div>
    )
}

export default ListingItem;