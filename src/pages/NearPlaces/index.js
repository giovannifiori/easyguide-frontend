import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Container } from './styles';

import PlaceList from '../../components/PlaceList';
import InfoDialog from '../../components/InfoDialog';

import api from '../../services/api';
import * as actions from '../../store/actions';

function NearPlaces(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [pageMessage, setPageMessage] = useState(
    'Buscando locais próximos a você...'
  );
  const [dialogState, setDialogState] = useState({
    open: false,
    title: '',
    text: ''
  });

  const requestNearbyPlaces = (lat, lng) => {
    if (props.nearbyPlaces && props.nearbyPlaces.length > 0) {
      setPageMessage('Estes são os locais pertinhos de você');
      setIsLoading(false);
      return;
    }
    api
      .get('places/nearby', {
        params: {
          location: `${lat},${lng}`
        }
      })
      .then(response => {
        props.setNearbyPlaces(response.data);
        setPageMessage('Estes são os locais pertinhos de você');
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
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
          setIsLoading(false);
          setPageMessage(
            'Não conseguimos obter sua localização. Por favor, verifique as permissões solicitadas por nós em seu navegador. Caso prefira, utilize o menu de busca para navegar pelos estabelecimentos :)'
          );
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
      <PlaceList isLoading={isLoading} places={props.nearbyPlaces} />
      {renderErrorDialog()}
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    nearbyPlaces: state.places.nearby
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNearbyPlaces: places => dispatch(actions.setNearbyResults(places))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NearPlaces);
