import React from 'react';

import GlobalStyle from '../../styles/global';

import Header from '../../components/Header';
import NearPlaces from '../NearPlaces';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <NearPlaces />
    </>
  );
}

export default App;
