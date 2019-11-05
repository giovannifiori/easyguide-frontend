import React from 'react';

import GlobalStyle from '../../styles/global';

import Header from '../../components/Header';
import NearPlaces from '../NearPlaces';

import { ContentContainer } from './styles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <ContentContainer>
        <NearPlaces />
      </ContentContainer>
    </>
  );
}

export default App;
