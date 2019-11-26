import React from 'react';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import * as firebase from 'firebase/app';

import { Container, UnorderedList, ListItem } from './styles';
import AppLogo from '../../assets/img/logo.png';
import { AppBar } from '@material-ui/core';

export default function Header() {
  return (
    <AppBar position="fixed">
      <Container>
        <img src={AppLogo} height="100%" alt="Easy Guide" />
        <nav>
          <UnorderedList>
            {!!firebase.auth().currentUser ? (
              <>
                <ListItem>
                  <NavLink to="/search">Buscar</NavLink>
                </ListItem>
                <ListItem>
                  <NavLink to="/nearby">Locais próximos</NavLink>
                </ListItem>
                <ListItem>
                  <NavLink to="/favorites">Favoritos</NavLink>
                </ListItem>
                <ListItem>
                  <NavLink to="/me">
                    <PersonIcon />
                  </NavLink>
                </ListItem>
              </>
            ) : (
              <ListItem>
                <NavLink to="/signin">Login</NavLink>
              </ListItem>
            )}
          </UnorderedList>
        </nav>
      </Container>
    </AppBar>
  );
}
