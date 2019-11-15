import React from 'react';

import GlobalStyle from '../../styles/global';

import Header from '../../components/Header';
import NearPlaces from '../NearPlaces';
import PlaceDetails from '../PlaceDetails';
import Search from '../Search';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { ContentContainer } from './styles';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <ContentContainer>
        <Switch>
          <Route path="/nearby" exact component={NearPlaces} />
          <Route path="/place" component={PlaceDetails} />
          <Route path="/search" exact component={Search} />
          <Redirect from="/" to="/nearby" exact />
          <Route render={() => <h2>Page not found</h2>} />
        </Switch>
      </ContentContainer>
    </BrowserRouter>
  );
}

export default App;
