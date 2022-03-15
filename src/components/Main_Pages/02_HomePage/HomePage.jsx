import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import HomeIcon from '@mui/icons-material/Home';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function HomePage() {

  const dispatch = useDispatch();
  const listings = useSelector(store => store.listings)

  useEffect(() => {
    dispatch({ type: 'FETCH_LISTINGS' })
  }, [])

  return (
    <>
      {listings.map(listing => (
        <>
          <br></br>
          <div><b>{listing.card_name}</b></div>
          <div>Set: {listing.set}</div>
          <div>Condition: {listing.condition}</div>
          <div>Graded: {listing.graded}</div>
          <div>Asking Price: {listing.asking_price}</div>
          <div>Notes: {listing.notes}</div>
          <br />
          <hr />
        </>
      ))}
    </>
  );
}

export default HomePage;
