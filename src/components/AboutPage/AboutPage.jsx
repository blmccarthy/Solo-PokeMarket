import React from 'react';

import GridViewIcon from '@mui/icons-material/GridView';


// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <GridViewIcon sx={{ fontSize: 50 }}/>
        <h1>LISTINGS</h1>
        <p>This about page is for anyone to read!</p>
      </div>
    </div>
  );
}

export default AboutPage;
