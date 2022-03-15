import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


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
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
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
      <TextField
        sx={{
          mb: '20px'
        }}
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
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
        onClick={login}>
          Log In
      </Button>


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
