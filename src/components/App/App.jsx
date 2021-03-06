import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import SearchBar from '../Static_MenuBars/SearchBar/SearchBar';
import Nav from '../Static_MenuBars/Nav/Nav';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../Login_Register/LoginPage';
import RegisterPage from '../Login_Register/RegisterPage';

import FilterPage from '../Main_Pages/01_FilterPage/FilterPage';
import HomePage from '../Main_Pages/02_HomePage/HomePage';
import DetailsPage from '../Main_Pages/02_HomePage/DetailsPage';
import OfferPage from '../Main_Pages/02_HomePage/OfferPage';
import SearchPage from '../Main_Pages/02_HomePage/SearchPage';
import MyListingsPage from '../Main_Pages/03_ListingsPage/MyListingsPage';
import CreateListingPage from '../Main_Pages/03_ListingsPage/CreateListingPage';
import EditPage from '../Main_Pages/03_ListingsPage/EditPage';
import ProfilePage from '../Main_Pages/04_ProfilePage/ProfilePage';
import ReviewOffersPage from '../Main_Pages/04_ProfilePage/ReviewOffersPage';
import AboutPage from '../Main_Pages/05_AboutPage/AboutPage';

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
          <Redirect exact from="/" to="/profile" />

          {/* Visiting localhost:3000/about will show the about page. */}
          {/* <Route
            // shows ListingsPage at all times (logged in or not)
            exact
            path="/listings"
          >
            <ListingsPage />
          </Route> */}

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the FilterPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute exact path="/filter">
            <FilterPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/home">
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/my-listings">
            <MyListingsPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile">
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/details/:id">
            <DetailsPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/create-listing">
            <CreateListingPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/edit/:id">
            <EditPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/offer/:id">
            <OfferPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/home/filter">      {/* No longer used I believe */}
            <SearchPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/review-offers">
            <ReviewOffersPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/about">
            <AboutPage />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/profile" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route exact path="/registration">
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/profile" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
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
