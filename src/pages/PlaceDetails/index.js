import React, { useState, useEffect } from 'react';
import { Button, Dialog, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';

import {
  Container,
  PlaceHeader,
  PlaceInfo,
  PlacePhoto,
  ButtonContainer,
  CharacteristicsContainer,
  ReviewsContainer
} from './styles';

import PlaceReview from '../PlaceReview';
import Characteristic from '../../components/Characteristic';
import AccessibilityMessage from '../../components/AccessibilityMessage';
import ReviewCard from '../../components/ReviewCard';

import { BASE_API_URL } from '../../config/constants';
import PlaceHolder from '../../assets/img/logo.png';

import api from '../../services/api';

import * as firebase from 'firebase/app';

export default withRouter(function PlaceDetails(props) {
  const { place } = props.history.location.state;
  const [dialogState, setDialogState] = useState({
    open: false
  });
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const currentUser = firebase.auth().currentUser;

  const fetchPlaceDetails = id => {
    if (!id) return;
    api
      .get(`places/${id}`, {
        params: {
          userId: currentUser.uid
        }
      })
      .then(details => {
        let { reviews, highlights, isFavorite } = details.data;
        setReviews(reviews);
        setHighlights(highlights);
        setIsFavorite(isFavorite);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPlaceDetails(place.place_id);
  }, []);

  const openReviewDialog = () => setDialogState({ ...dialogState, open: true });

  const closeReviewDialog = () =>
    setDialogState({ ...dialogState, open: false });

  const handleSnackbarClose = () => {
    setSnackbarState({
      ...snackbarState,
      open: false
    });
  };

  if (!place) {
    return null;
  }

  const addPlaceToFavorites = (placeId, userId) => {
    api
      .post(`users/${userId}/favorites`, {
        id: placeId
      })
      .then(() => {
        setSnackbarState({
          open: true,
          message: `${place.name} foi adicionado aos seus favoritos!`
        });
      })
      .catch(e => {
        setIsFavorite(false);
        setSnackbarState({
          open: true,
          message: `Falha ao adicionar ${place.name} aos seus favoritos!`
        });
      });
  };

  const removePlaceFromFavorites = (placeId, userId) => {
    api
      .delete(`users/${userId}/favorites`, {
        data: {
          id: placeId
        }
      })
      .then(response => {
        setSnackbarState({
          open: true,
          message: `${place.name} foi removido dos seus favoritos!`
        });
      })
      .catch(e => {
        setIsFavorite(true);
        setSnackbarState({
          open: true,
          message: `Falha ao remover ${place.name} dos seus favoritos!`
        });
      });
  };

  const handlePlaceAsFavorite = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      removePlaceFromFavorites(place.place_id, currentUser.uid);
    } else {
      addPlaceToFavorites(place.place_id, currentUser.uid);
    }
  };

  const renderReviewDialog = () => {
    return (
      <Dialog
        fullWidth
        open={dialogState.open}
        onBackdropClick={closeReviewDialog}
      >
        <PlaceReview
          placeId={place.place_id}
          onReviewFinished={closeReviewDialog}
        />
      </Dialog>
    );
  };

  const renderSnackbar = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={<span id="message-id">{snackbarState.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  };

  const isOpenNow = place.opening_hours && place.opening_hours.open_now;

  const photoreference =
    place.photos && place.photos[0] ? place.photos[0].photo_reference : null;

  return (
    <Container>
      <span>
        <Button onClick={() => props.history.goBack()}>Voltar</Button>
      </span>
      <PlaceHeader>
        <PlacePhoto
          src={
            photoreference
              ? `${BASE_API_URL}places/photo/${photoreference}`
              : PlaceHolder
          }
          alt={props.name}
          onerror="if (this.src != '/public/img/logo.png') this.src = '/public/img/logo.png"
        />
        <PlaceInfo>
          <h1>{place.name}</h1>
          <AccessibilityMessage
            totalReviews={place.totalAccessibilityReviews}
            positiveOpinionsPercentage={place.positiveOpinionsPercentage}
          />
          <ButtonContainer>
            <Button
              variant="contained"
              color="secondary"
              disabled={isLoading}
              onClick={handlePlaceAsFavorite}
            >
              {isFavorite ? 'Remover dos ' : 'Adicionar aos'} favoritos
            </Button>
            <Button
              style={{ marginTop: 16 }}
              variant="contained"
              color="primary"
              onClick={openReviewDialog}
              disabled={isLoading}
            >
              Publicar avaliação
            </Button>
          </ButtonContainer>
        </PlaceInfo>
      </PlaceHeader>

      <CharacteristicsContainer>
        {highlights && highlights.length > 0 && (
          <Characteristic
            title="Destaques"
            description="Esses são os pontos citados como destaque por outras pessoas que avaliaram esse local:"
            items={highlights}
          />
        )}
        <Characteristic
          title="Endereço"
          description={place.formatted_address || place.vicinity}
        />
        <Characteristic
          title="Aberto agora"
          description={isOpenNow ? 'Sim' : 'Não'}
        />
        <Characteristic
          title="Avaliação média geral"
          description={place.rating || 'Sem informação'}
        />
        <Characteristic
          title={`Avaliações dos usuários (${place.totalAccessibilityReviews ||
            reviews.length})`}
        />
        <ReviewsContainer>
          {reviews.map(review => (
            <ReviewCard review={review} />
          ))}
        </ReviewsContainer>
      </CharacteristicsContainer>

      {renderReviewDialog()}
      {renderSnackbar()}
    </Container>
  );
});
