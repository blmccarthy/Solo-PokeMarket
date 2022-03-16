import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function ListingItem({ listing }) {

    const images = useSelector(store => store.listings.imageReducer)

    const history = useHistory();

    const handleListingClick = () => {
        history.push(`/details/${listing.id}`)
    }

    return (

        <div
            value={listing.id}
            onClick={handleListingClick}
        >
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <br />
                    <div className="home_img">
                        <img src={(images.filter(image => image.listing_id == listing.id)[0])?.url} />
                    </div>
                </Grid>
                <Grid item xs={7}>
                    <div><b>{listing.card_name}</b></div>
                    <div>Set: {listing.set}</div>
                    <div>Condition: {listing.condition}</div>
                    <div>Graded: {listing.graded}</div>
                    <div>Asking Price: {listing.asking_price}</div>
                    <div>Notes: {listing.notes.substring(0, 80)}{listing.notes.length >= 80 && '...'}</div>
                    <br />
                </Grid>
            </Grid>
            <hr />
        </div>
    )
}

export default ListingItem;