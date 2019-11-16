import React from 'react';

import { Container, Image, Info, PlaceTitle, PlaceSubtitle } from './styles';
import { Card } from '@material-ui/core';
import { BASE_API_URL } from '../../config/constants';
import Placeholder from '../../assets/img/placeholder.png';

import AccessibilityMessage from '../AccessibilityMessage';

export default function PlaceCard(props) {
  return (
    <Container onClick={props.onClick}>
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
          <AccessibilityMessage
            totalReviews={props.totalReviews}
            positivePercentage={props.positivePercentage}
          />
        </Info>
      </Card>
    </Container>
  );
}
