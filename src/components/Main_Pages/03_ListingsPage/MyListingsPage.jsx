import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import MyListingsItem from './MyListingsItem';


function ListingPage() {

  const dispatch = useDispatch();
  const myListings = useSelector(store => store.listings.myListingReducer)

  useEffect(() => {
    dispatch({ type: 'FETCH_MY_LISTINGS' })
    dispatch({ type: 'FETCH_CONDITIONS' })
    dispatch({ type: 'FETCH_LISTING_IMAGES' })
  }, [])

  return (
    <>
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

