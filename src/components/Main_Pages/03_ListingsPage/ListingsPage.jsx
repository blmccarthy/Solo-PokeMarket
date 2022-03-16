import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


function ListingPage() {

  const dispatch = useDispatch();
  const listings = useSelector(store => store.listings.listingReducer)

  useEffect(() => {
    // dispatch({ type: 'FETCH_MY_LISTINGS' })
    dispatch({ type: 'FETCH_CONDITIONS' })
    dispatch({ type: 'FETCH_LISTING_IMAGES' })
  }, [])

  return (
    <>
      {listings.map(listing => (
        <ListingItem 
          key={listing.id} 
          listing={listing} 
        />
      ))}
    </>
  );
}

export default ListingPage;

