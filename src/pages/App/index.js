import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../config/firebaseConfig';

import GlobalStyle from '../../styles/global';

import Header from '../../components/Header';
import NearPlaces from '../NearPlaces';
import PlaceDetails from '../PlaceDetails';
import Search from '../Search';
import Favorites from '../Favorites';
import UnauthorizedPage from '../Unauthorized';
import SignIn from '../SignIn';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { ContentContainer } from './styles';
import Profile from '../Profile';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  emailProvider: new firebase.auth.EmailAuthProvider()
};

function App(props) {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <ContentContainer>
        <Switch>
          <Route
            path="/nearby"
            exact
            render={() =>
              !!props.user ? <NearPlaces /> : <UnauthorizedPage />
            }
          />
          <Route
            path="/favorites"
            exact
            render={() => (!!props.user ? <Favorites /> : <UnauthorizedPage />)}
          />
          <Route
            path="/place/:placeId"
            render={() =>
              !!props.user ? <PlaceDetails /> : <UnauthorizedPage />
            }
          />
          <Route
            path="/search"
            exact
            render={() => (!!props.user ? <Search /> : <UnauthorizedPage />)}
          />
          <Route path="/signin" exact render={() => <SignIn {...props} />} />
          <Route
            path="/me"
            exact
            render={() => (!!props.user ? <Profile /> : <UnauthorizedPage />)}
          />
          <Redirect from="/" to="/nearby" exact />
          <Route render={() => <h2>Page not found</h2>} />
        </Switch>
      </ContentContainer>
    </BrowserRouter>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
