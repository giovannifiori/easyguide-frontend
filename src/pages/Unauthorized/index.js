import React from 'react';
import { Button } from '@material-ui/core';

import { Container, MainTitle, StyledLink } from './styles';

export default function Unauthorized(props) {
  return (
    <Container>
      <MainTitle>
        Para acessar esse recurso, você precisa fazer login na aplicação.
      </MainTitle>
      <Button variant="contained" color="primary">
        <StyledLink to="/signin">Clique aqui para fazer login</StyledLink>
      </Button>
    </Container>
  );
}
