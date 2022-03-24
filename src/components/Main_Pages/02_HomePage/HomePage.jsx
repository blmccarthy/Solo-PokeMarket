import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import HomeItem from './HomeItem';

import Typography from '@mui/material/Typography';

function HomePage() {

  const dispatch = useDispatch();
  const listings = useSelector(store => store.listings.listingReducer)
  const searchQuery = useSelector(store => store.filters.searchQueryReducer)

  useEffect(() => {
    window.scrollTo(0, 0);
    // dispatch({ type: 'FETCH_LISTINGS' });
  }, [])

  return (
    <>
      {listings.map(listing => (
        <HomeItem 
          key={listing.id} 
          listing={listing} 
        />
      ))}
      {listings.length == 0 && <Typography sx={{ textAlign: "center", mt: 10 }}>No Results Found :(</Typography>}
    </>
  );
}

export default HomePage;
