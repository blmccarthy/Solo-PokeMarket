// React Imports --------------------------------------------------------------
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// MUI -----------------------------------------------------------------------
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login
  
  const history = useHistory();

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2, ml: 2, fontWeight: '300' }}>Login:</Typography>

      {/* ----- Error Messages ---------------------------- */}
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

      {/* ----- Username Input ---------------------------- */}
      <TextField
        sx={{
          mb: '20px'
        }}
        id="outlined-required"
        label="Username"
        autoComplete="off"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
        fullWidth
      />

      {/* ----- Password Input ---------------------------- */}
      <TextField
        sx={{ mb: '20px' }}
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        fullWidth
      />

      {/* ----- Login Button ---------------------------- */}
      <Button
        sx={{
          mb: '20px'
        }}
        variant="contained"
        fullWidth
        onClick={login}>
        Log In
      </Button>

      {/* ----- Register Button ---------------------------- */}
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>

      </center>
    </div>
  );
}

export default LoginPage;
