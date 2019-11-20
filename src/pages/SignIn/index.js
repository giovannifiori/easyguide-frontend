import React from 'react';
import { Button } from '@material-ui/core';

import { Container } from './styles';

function SignIn(props) {
  return (
    <Container>
      <Button onClick={props.signInWithGoogle}>Login</Button>
    </Container>
  );
}

export default SignIn;
