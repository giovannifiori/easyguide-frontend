import React from 'react';
import PlaceCard from '../PlaceCard';
import { CircularProgress } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import { Container } from './styles';

function PlaceList(props) {
  let placesContent;
  const { isLoading, places } = props;

  function goToPlaceDetails(place) {
    props.history.push(`/place/${place.place_id}`, {
      place
    });
  }

  if (isLoading) {
    placesContent = <CircularProgress />;
  } else if (places && places.length === 0) {
    placesContent = <h2>Nenhum local a ser exibido</h2>;
  } else {
    placesContent = places.map(place =>
      !place ? null : (
        <PlaceCard
          name={place.name || ''}
          address={place.formatted_address || ''}
          photoreference={
            place.photos && place.photos[0]
              ? place.photos[0].photo_reference
              : null
          }
          totalReviews={place.totalAccessibilityReviews || 0}
          positiveOpinionsPercentage={place.positiveOpinionsPercentage || ''}
          key={place.id}
          onClick={() => goToPlaceDetails(place)}
        />
      )
    );
  }

  return <Container isLoading={isLoading}>{placesContent}</Container>;
}

export default withRouter(PlaceList);
