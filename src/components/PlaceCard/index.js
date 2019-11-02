import React from 'react';

import {
  Container,
  Image,
  Info,
  PlaceTitle,
  PlaceSubtitle,
  Message
} from './styles';
import { Card } from '@material-ui/core';
import { BASE_API_URL } from '../../config/constants';
import Placeholder from '../../assets/img/placeholder.png';

export default function PlaceCard(props) {
  let percentageMessage = 'Local ainda não avaliado.';
  let messageColor = '#212121';
  if (props.totalReviews) {
    if (props.positivePercentage < 30) {
      percentageMessage = `Somente ${props.positivePercentage}% das pessoas consideram esse lugar parcial ou totalmente acessível!`;
      messageColor = '#CE2F19';
    } else {
      percentageMessage = `${props.positivePercentage}% das pessoas consideram esse lugar parcial ou totalmente acessível!`;
      messageColor = '#4B8F39';
    }
  }

  return (
    <Container>
      <Card>
        <Image
          src={
            props.photoreference
              ? `${BASE_API_URL}places/photo/${props.photoreference}`
              : Placeholder
          }
          alt={props.name}
          onerror="if (this.src != '/public/img/logo.png') this.src = '/public/img/logo.png"
        />
        <Info>
          <PlaceTitle>{props.name}</PlaceTitle>
          <PlaceSubtitle>{props.address}</PlaceSubtitle>
          <Message color={messageColor}>{percentageMessage}</Message>
        </Info>
      </Card>
    </Container>
  );
}
