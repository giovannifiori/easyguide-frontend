import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Container, PlacesContainer } from './styles';
import PlaceCard from '../../components/PlaceCard';
import InfoDialog from '../../components/InfoDialog';

import api from '../../services/api';

export default function NearPlaces() {
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [dialogState, setDialogState] = useState({
    open: false,
    title: '',
    text: ''
  });

  const requestNearbyPlaces = (lat, lng) => {
    api
      .get('places/nearby', {
        params: {
          location: `${lat},${lng}`
        }
      })
      .then(response => {
        setPlaces(response.data);
        setIsLoading(false);
      })
      .catch(err => {});
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          requestNearbyPlaces(latitude, longitude);
        },
        error => {
          setDialogState({
            title: 'Erro de localização',
            text: 'Houve um erro ao tentar buscar a sua localização atual.',
            open: true
          });
        }
      );
    } else {
      setDialogState({
        title: 'Erro de localização',
        text:
          'Desculpe! Serviços de geolocalização não estão disponíveis no seu navegador...',
        open: true
      });
    }
  }, []);

  let pageMessage = 'Buscando locais próximos a você...';
  let placesContent = <CircularProgress />;
  if (!isLoading) {
    placesContent = places.map(place => (
      <PlaceCard
        name={place.name}
        address={place.formattedAddress}
        photoreference={
          place.photos && place.photos[0]
            ? place.photos[0].photo_reference
            : null
        }
        positivePercentage={place.positiveOpinionsPercentage}
      />
    ));
    pageMessage = 'Estes são os locais pertinhos de você';
  }

  const closeInfoDialog = () => setDialogState({ ...dialogState, open: false });

  const renderErrorDialog = () => (
    <InfoDialog
      open={dialogState.open}
      title={dialogState.title}
      text={dialogState.text}
      onNeutralButtonClick={closeInfoDialog}
    />
  );

  return (
    <Container>
      <h2>{pageMessage}</h2>
      <PlacesContainer>{placesContent}</PlacesContainer>
      {renderErrorDialog()}
    </Container>
  );
}
