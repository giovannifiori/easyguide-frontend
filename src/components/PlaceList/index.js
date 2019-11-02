import React from 'react';
import PlaceCard from '../PlaceCard';
import { CircularProgress } from '@material-ui/core';

import { Container } from './styles';

export default function PlaceList(props) {
  let placesContent;
  const { isLoading, places } = props;

  if (isLoading) {
    placesContent = <CircularProgress />;
  } else if (places && places.length === 0) {
    placesContent = <h2>Nenhum local a ser exibido</h2>
  } else {
    placesContent = places.map(place => (
      <PlaceCard
        name={place.name || ''}
        address={place.formatted_address || ''}
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
      <Container isLoading={isLoading} >
          {placesContent}
      </Container>
  );
}
