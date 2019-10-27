import React from 'react';

import { Container } from './styles';
import AppLogo from '../../assets/img/logo.png';

export default function Header() {
  return (
    <Container>
      <img src={AppLogo} height='100%' alt="App logo" />
    </Container>
  );
}
