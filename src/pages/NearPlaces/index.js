import React, { useState, useEffect } from 'react';

import { Container } from './styles';

import PlaceList from '../../components/PlaceList';

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
  if (!isLoading) {
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
      <PlaceList isLoading={isLoading} places={places} />
      {renderErrorDialog()}
    </Container>
  );
}
