import React from 'react';

import { Container, Title, Description } from './styles';

export default function Characteristic(props) {
  return props.title && props.description ? (
    <Container>
      <Title>{props.title}</Title>
      <Description>{props.description}</Description>
    </Container>
  ) : null;
}
