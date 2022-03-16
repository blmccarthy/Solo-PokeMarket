import {useHistory} from 'react-router-dom';


function ListingItem({ listing }) {

    const history = useHistory();

    const handleListingClick = () => {
        history.push(`/details/${listing.id}`)
    }

    return (
        <div
            value={listing.id}
            onClick={handleListingClick}
        >
            <br />
            {/* <img src={(images.filter(image => image.listing_id == listing.id)[0]).url} /> */}
            <div><b>{listing.card_name}</b></div>
            <div>Set: {listing.set}</div>
            <div>Condition: {listing.condition}</div>
            <div>Graded: {listing.graded}</div>
            <div>Asking Price: {listing.asking_price}</div>
            <div>Notes: {listing.notes.substring(0, 80)}{listing.notes.length >= 80 && '...'}</div>
            <br />
            <hr />
        </div>
    )
}

export default ListingItem;