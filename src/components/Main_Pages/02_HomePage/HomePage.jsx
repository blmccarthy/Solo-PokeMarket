// React Imports --------------------------------------------------------------
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

// MUI --------------------------------------------------------------

import Typography from '@mui/material/Typography';

// Components --------------------------------------------------------------

import HomeItem from './HomeItem';

function HomePage() {

  const dispatch = useDispatch();
  const listings = useSelector(store => store.listings.listingReducer)
  const searchQuery = useSelector(store => store.filters.searchQueryReducer)

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({ type: 'FETCH_CONDITIONS' });
    dispatch({ type: 'FETCH_LISTING_IMAGES' });
  }, [])

  return (
    <>
      {listings.map(listing => (
        <HomeItem
          key={listing.id}
          listing={listing}
        />
      ))}
      
      {/* Displays if no listings are found in reducer */}
      {listings.length == 0 && <Typography sx={{ textAlign: "center", mt: 10 }}>No Results Found :(</Typography>}
    </>
  );
}

export default HomePage;
