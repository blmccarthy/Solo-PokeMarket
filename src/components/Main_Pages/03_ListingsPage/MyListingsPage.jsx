import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import MyListingsItem from './MyListingsItem';

import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function ListingPage() {

  const history = useHistory();
  const dispatch = useDispatch();
  const myListings = useSelector(store => store.listings.myListingReducer)

  const handleCreateListing = () => {
    console.log('click');
    history.push('/create-listing')
  } 

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({ type: 'FETCH_MY_LISTINGS' })
    dispatch({ type: 'FETCH_CONDITIONS' })
    dispatch({ type: 'FETCH_LISTING_IMAGES' })
  }, [])

  return (
    <>
      {/* NOTE: Button 'position' set to 'static' due to them overlapping my navbar by default */}
      <Button fullWidth variant="contained" sx={{ mb: 2, position: 'static'}}
        onClick={handleCreateListing}
      >
        <AddCircleOutlineIcon />&nbsp; Create Listing
      </Button>
      {myListings.map(listing => (
        <MyListingsItem 
          key={listing.id} 
          listing={listing} 
        />
      ))}
    </>
  );
}

export default ListingPage;

