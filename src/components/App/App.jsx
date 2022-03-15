import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import SearchBar from '../SearchBar/SearchBar';
import Nav from '../Nav/Nav';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import LandingPage from '../LandingPage/LandingPage';
import FilterPage from '../Nav01_FilterPage/FilterPage';
import HomePage from '../Nav02_HomePage/HomePage';
import ListingsPage from '../Nav03_ListingsPage/ListingsPage';
import ProfilePage from '../Nav04_ProfilePage/ProfilePage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
        <Nav />
        <SearchBar />
      <div className="main">
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows ListingsPage at all times (logged in or not)
            exact
            path="/listings"
          >
            <ListingsPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the FilterPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows FilterPage else shows LoginPage
            exact
            path="/filter"
          >
            <FilterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/home"
          >
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/profile"
          >
            <ProfilePage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
