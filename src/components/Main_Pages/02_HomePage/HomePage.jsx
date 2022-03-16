import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import ListingItem from './ListingItem';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function HomePage() {

  const dispatch = useDispatch();
  const listings = useSelector(store => store.listings.listingReducer)

  useEffect(() => {
    dispatch({ type: 'FETCH_LISTINGS' })
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

export default HomePage;
