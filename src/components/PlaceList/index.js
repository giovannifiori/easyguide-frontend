import React from 'react';
import PlaceCard from '../PlaceCard';
import { CircularProgress } from '@material-ui/core';

import { Container } from './styles';

export default function PlaceList(props) {
  let placesContent;

  if (props.isLoading) {
    placesContent = <CircularProgress />;
  } else {
    placesContent = props.places.map(place => (
      <PlaceCard
        name={place.name || ''}
        address={place.formattedAddress || ''}
        photoreference={
          place.photos && place.photos[0]
            ? place.photos[0].photo_reference
            : null
        }
        positivePercentage={place.positiveOpinionsPercentage || ''}
      />
    ));
  }

  return (
      <Container isLoading={props.isLoading} >
          {placesContent}
      </Container>
  );
}
