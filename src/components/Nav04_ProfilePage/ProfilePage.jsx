import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function ProfilePage() {

  return (
    <div className="container">
      <AccountCircleIcon sx={{ fontSize: 50 }}/>
      <h1>PROFILE</h1>          
    </div>
  );
}

export default ProfilePage;
