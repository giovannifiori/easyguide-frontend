import React from 'react';

import {Container, Title, Description} from './styles';

export default function Characteristic(props) {
    return (
        <Container>
            <Title>{props.title}</Title>
            <Description>{props.description}</Description>
        </Container>
    )
}