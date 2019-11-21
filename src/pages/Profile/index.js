import React from 'react';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase/app';

import { Container, Info, Header, Image, Title } from './styles';

import Characteristic from '../../components/Characteristic';
import { Button } from '@material-ui/core';

export default withRouter(function Profile({ history }) {
  const user = firebase.auth().currentUser;

  if (!user) {
    history.goBack();
    return;
  }

  const doSignout = async () => {
    await firebase.auth().signOut();
    history.push('/signin');
  };

  return (
    <Container>
      <Header>
        <Image src={user.photoURL} />
        <Title>{user.displayName}</Title>
      </Header>
      <Info>
        <Characteristic title="Email" description={user.email} />
        <Button onClick={doSignout} variant="contained" color="secondary">
          Sair da conta
        </Button>
      </Info>
    </Container>
  );
});
