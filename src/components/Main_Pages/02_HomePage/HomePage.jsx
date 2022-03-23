import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import HomeItem from './HomeItem';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function HomePage() {

  const dispatch = useDispatch();
  const listings = useSelector(store => store.listings.listingReducer)
  const searchQuery = useSelector(store => store.filters.searchQueryReducer)

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({ type: 'FETCH_LISTINGS' });
    // dispatch({ type: 'FETCH_LISTING_IMAGES' }); // moved to 'HomeItem
  }, [!searchQuery])

  return (
    <>
      {listings.map(listing => (
        <HomeItem 
          key={listing.id} 
          listing={listing} 
        />
      ))}
    </>
  );
}

export default HomePage;
