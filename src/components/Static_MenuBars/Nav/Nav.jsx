import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../../Login_Register/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import HomeIcon from '@mui/icons-material/Home';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Nav() {
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
              <HomeIcon sx={{ fontSize: 35 }}/>
            </Link>

            <Link className="navLink" to="/listings">
              <GridViewIcon sx={{ fontSize: 35 }}/>
            </Link>

            <Link className="navLink" to="/profile">
              <AccountCircleIcon sx={{ fontSize: 35 }}/>
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}


    </div>
  );
}

export default Nav;
