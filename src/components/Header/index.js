import React from 'react';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';

import { Container, UnorderedList, ListItem } from './styles';
import AppLogo from '../../assets/img/logo.png';

export default function Header() {
  return (
    <Container>
      <img src={AppLogo} height="100%" alt="Easy Guide" />
      <nav>
        <UnorderedList>
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
        </UnorderedList>
      </nav>
    </Container>
  );
}
