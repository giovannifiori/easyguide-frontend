import React from 'react';

import { Container, Title, Description } from './styles';

export default function Characteristic(props) {
  return (
    <Container>
      {props.title && <Title>{props.title}</Title>}
      {props.description && <Description>{props.description}</Description>}
      {props.items && (
        <ul>
          {props.items.map(item => (
            <li>{item}</li>
          ))}
        </ul>
      )}
    </Container>
  );
}
