import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase/app';
import { connect } from 'react-redux';

import { Container } from './styles';

import PlaceList from '../../components/PlaceList';
import InfoDialog from '../../components/InfoDialog';

import api from '../../services/api';
import * as actions from '../../store/actions';

function Favorites(props) {
  const currentUser = firebase.auth().currentUser || {};

  const [isLoading, setIsLoading] = useState(true);
  const [dialogState, setDialogState] = useState({
    open: false,
    title: '',
    text: ''
  });

  const requestFavoritePlaces = userId => {
    if (props.favoritesWereFetched) {
      setIsLoading(false);
      return;
    }
    api
      .get(`users/${userId}/favorites`)
      .then(response => {
        props.setFavoritePlaces(response.data);
        props.setFavoritesWereFetched(true);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    requestFavoritePlaces(currentUser.uid);
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
      <h1>{pageMessage}</h1>
      <PlaceList isLoading={isLoading} places={props.favoritePlaces} />
      {renderErrorDialog()}
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    favoritePlaces: state.places.favorites,
    favoritesWereFetched: state.places.favoritesWereFetched
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFavoritePlaces: places => dispatch(actions.setFavorites(places)),
    setFavoritesWereFetched: favoritesWereFetched =>
      dispatch(actions.setFavoritesWereFetched(favoritesWereFetched))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Favorites));
