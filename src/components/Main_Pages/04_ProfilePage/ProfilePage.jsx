import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function ProfilePage() {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MY_LISTINGS_COUNT' });
    dispatch({ type: 'FETCH_OFFERS_OUT_COUNT' });
    dispatch({ type: 'FETCH_OFFERS_IN_COUNT' });
  }, []);

  const user = useSelector(store => store.user);
  const profile = useSelector(store => store.profile.profileCountReducer);

  const [editEnabled, setEditEnabled] = useState(false)

  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)
  const [city, setCity] = useState(user.city)
  const [state, setState] = useState(user.state)
  const [profileImage, setProfileImage] = useState(user.profile_pic)

  // Toggles Edit Mode, Conditional Rendering Triggered
  const handleEdit = () => {
    setEditEnabled(!editEnabled)
  }

  const handleUpdate = () => {
    dispatch({ 
      type: 'UPDATE_PROFILE',
      payload: {
        first_name: firstName,
        last_name: lastName,
        city: city,
        state: state,
        profile_pic: profileImage
      }
    })
  }

  return (
    <>
      <Avatar
        alt={user.username}
        src={user.profile_pic}
        sx={{ width: 180, height: 180, margin: "auto", mt: 1 }}
      />

      {editEnabled ? // Edit Enabled ================================================================== //

      <>
        <Grid container spacing={2} sx={{ mt: 1, mb: 3 }} >
          <Grid item xs={12}>
            <TextField
              id="outlined-required"
              label="First Name"
              autoComplete="off"
              fullWidth
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-required"
              label="Last Name"
              autoComplete="off"
              fullWidth
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="outlined-required"
              label="City"
              autoComplete="off"
              fullWidth
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-required"
              label="State"
              autoComplete="off"
              fullWidth
              inputProps={{ maxLength: 2, style: { textTransform: "uppercase" }}}
              value={state}
              onChange={e => setState(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-required"
              label="Profile Image URL"
              autoComplete="off"
              fullWidth
              value={profileImage}
              onChange={e => setProfileImage(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth
              onClick={handleEdit}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>


      </> 
      : // Edit Disabled =============================================================================== //
       <>


        <Typography variant="h5" sx={{ textAlign: 'center', my: 2 }}>Welcome, {user.username}!</Typography>

        <Grid container spacing={2} sx={{ px: 2, mb: 2 }}>
          <Grid item xs={6}>
            <Typography sx={{ color: '#707070' }}>First Name:</Typography>
            <Typography sx={{ mb: .75, fontWeight: 500 }}>{user.first_name}</Typography>
            <Typography sx={{ color: '#707070' }}>Last Name:</Typography>
            <Typography sx={{ mb: .75, fontWeight: 500 }}>{user.last_name}</Typography>
            <Typography sx={{ color: '#707070' }}>Location:</Typography>
            <Typography sx={{ mb: .75, fontWeight: 500 }}>{user.city}, {user.state}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ color: '#707070' }}>Active Listings:</Typography>
            <Typography sx={{ mb: .75, fontWeight: 500,}}>{profile.listing_count}</Typography>
            <Typography sx={{ color: '#707070' }}>Outgoing Offers:</Typography>
            <Typography sx={{ mb: .75, fontWeight: 500 }}>{profile.offer_in_count}</Typography>
            <Typography sx={{ color: '#707070' }}>Incoming Offers:</Typography>
            <Typography sx={{ mb: .75, fontWeight: 500 }}>{profile.offer_out_count}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth
              onClick={handleEdit}
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth
              onClick={() => dispatch({ type: 'LOGOUT' })}
            >
              Sign Out
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ mt: 4}}>
            <Button 
              variant="contained" 
              fullWidth
              onClick={() => history.push('/my-listings')}
            >
              My Listings
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              fullWidth
              onClick={() => history.push('/review-offers')}
            >
              Review Offers
            </Button>
          </Grid>
        </Grid>
      </>
      }
    </>
  );
}

export default ProfilePage;
