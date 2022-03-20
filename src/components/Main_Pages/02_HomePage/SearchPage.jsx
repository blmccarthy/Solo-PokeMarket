import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import HomeItem from './HomeItem';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function SearchPage() {

    const { search } = useParams();
    const dispatch = useDispatch();
    const filterResults = useSelector(store => store.filterResults)

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch({ type: 'FETCH_SEARCH', payload: search })
        dispatch({ type: 'FETCH_LISTING_IMAGES' })
    }, [])

    return (
        <>
            {filterResults.map(listing => (
                <HomeItem
                    key={listing.id}
                    listing={listing}
                />
            ))}
        </>
    );
}

export default SearchPage;
