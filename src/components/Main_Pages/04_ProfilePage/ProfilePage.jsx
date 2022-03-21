import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function ProfilePage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MY_LISTINGS_COUNT' })
    dispatch({ type: 'FETCH_MY_LISTINGS_COUNT' })
  }, []);

  const user = useSelector(store => store.user)
  const myListingCount = useSelector(store => store.profile.myListingCountReducer)


  console.log('myListingCount', myListingCount);

  return (
    <>
      <Avatar
        alt={user.username}
        src={user.profile_pic}
        sx={{ width: "50%", height: "50%", margin: "auto", mt: 1 }}
      />
      <Typography variant="h5" sx={{ textAlign: 'center', my: 2 }}>Welcome, {user.username}!</Typography>
      <Grid container spacing={2} sx={{ px: 2 }}>
        <Grid item xs={6}>
          <Typography sx={{ color: '#707070'}}>First Name:</Typography>
          <Typography sx={{ mb: .75, fontWeight: 500 }}>{user.first_name}</Typography>
          <Typography sx={{ color: '#707070'}}>Last Name:</Typography>
          <Typography sx={{ mb: .75, fontWeight: 500 }}>{user.last_name}</Typography>
          <Typography sx={{ color: '#707070'}}>Location:</Typography>
          <Typography sx={{ mb: .75, fontWeight: 500 }}>{user.city}, {user.state}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ color: '#707070'}}>Active Listings:</Typography>
          <Typography sx={{ mb: .75, fontWeight: 500 }}>{myListingCount.count}</Typography>
          <Typography sx={{ color: '#707070'}}>Pending Offers:</Typography>
          <Typography sx={{ mb: .75, fontWeight: 500 }}>{user.last_name}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfilePage;
