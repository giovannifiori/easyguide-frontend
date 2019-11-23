import React from 'react';

import { Container, PlaceTitle, PlaceSubtitle } from './styles';
import AccessibilityMessage from '../AccessibilityMessage';

export default function PlaceCard(props) {
  return (
    <Container onClick={props.onClick}>
      <PlaceTitle>{props.name}</PlaceTitle>
      <PlaceSubtitle>{props.address}</PlaceSubtitle>
      <AccessibilityMessage
        totalReviews={props.totalReviews}
        positiveOpinionsPercentage={props.positiveOpinionsPercentage}
      />
    </Container>
  );
}
