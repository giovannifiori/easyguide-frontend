import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { Container } from './styles';

import PlaceList from '../../components/PlaceList';

import InfoDialog from '../../components/InfoDialog';

import api from '../../services/api';

function Favorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [dialogState, setDialogState] = useState({
    open: false,
    title: '',
    text: ''
  });

  const requestFavoritePlaces = userId => {
    api
      .get(`users/${userId}/favorites`)
      .then(response => {
        setPlaces(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    requestFavoritePlaces('aaa111');
  }, []);

  let pageMessage = 'Buscando seus locais favoritos...';
  if (!isLoading) {
    pageMessage = 'Esses são seus locais favoritos';
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

export default withRouter(Favorites);
