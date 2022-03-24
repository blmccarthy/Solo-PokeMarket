import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../../Login_Register/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Nav() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/filter">
            <FilterListIcon sx={{ fontSize: 35 }}/>
            </Link>

            <Link className="navLink" to="/home">
              <HomeOutlinedIcon sx={{ fontSize: 35 }}
                onClick={() => dispatch({ type: 'FETCH_LISTINGS' })}
              />
            </Link>

            <Link className="navLink" to="/my-listings">
              <GridViewIcon sx={{ fontSize: 35 }}/>
            </Link>

            <Link className="navLink" to="/profile">
              <AccountCircleOutlinedIcon sx={{ fontSize: 35 }}/>
            </Link>

            <Link className="navLink" to="/login">
              <LogoutOutlinedIcon sx={{ fontSize: 35 }}
                onClick={() => dispatch({ type: 'LOGOUT' })}
              />
            </Link>

          </>
        )}


    </div>
  );
}

export default Nav;
