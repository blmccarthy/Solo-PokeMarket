import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser
  const history = useHistory();

  return (
    <div>
      <h2>Register</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      <TextField
        sx={{
          mb: '20px'
        }}
        id="outlined-required"
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
        fullWidth
      />
      <TextField
        sx={{
          mb: '20px'
        }}
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={(event) => setPassword(event.target.value)}
        required
        fullWidth
      />
      <Button
        sx={{
          mb: '20px'
        }}
        variant="contained"
        fullWidth
        onClick={registerUser}>
          Register
      </Button>

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
