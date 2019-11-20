import React, { useState, useEffect } from 'react';
import { Button, Dialog } from '@material-ui/core';

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

export default function PlaceDetails(props) {
  const { place } = props.history.location.state;
  const [dialogState, setDialogState] = useState({
    open: false
  });
  const [reviews, setReviews] = useState([]);
  const [highlights, setHighlights] = useState([]);

  const fetchPlaceDetails = id => {
    if (!id) return;
    api.get(`places/${id}`).then(details => {
      let { reviews, highlights } = details.data;
      setReviews(reviews);
      setHighlights(highlights);
    });
  };

  useEffect(() => {
    fetchPlaceDetails(place.place_id);
  }, []);

  const openReviewDialog = () => setDialogState({ ...dialogState, open: true });

  const closeReviewDialog = () =>
    setDialogState({ ...dialogState, open: false });

  if (!place) {
    return null;
  }

  const renderReviewDialog = () => {
    return (
      <Dialog
        fullWidth
        open={dialogState.open}
        onBackdropClick={closeReviewDialog}
      >
        <PlaceReview placeId={place.place_id} />
      </Dialog>
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
            fontSize={16}
            totalReviews={place.totalAccessibilityReviews}
            positiveOpinionsPercentage={place.positiveOpinionsPercentage}
          />
          <ButtonContainer>
            <Button variant="contained" color="secondary">
              Adicionar aos favoritos
            </Button>
            <Button
              style={{ marginTop: 16 }}
              variant="contained"
              color="primary"
              onClick={openReviewDialog}
            >
              Publicar avaliação
            </Button>
          </ButtonContainer>
        </PlaceInfo>
      </PlaceHeader>

      <CharacteristicsContainer>
        <Characteristic
          title="Destaques"
          description="Esses são os pontos citados como destaque por outras pessoas que avaliaram esse local:"
          items={highlights}
        />
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
          title={`Avaliações dos usuários (${place.totalAccessibilityReviews})`}
        />
        <ReviewsContainer>
          {reviews.map(review => (
            <ReviewCard review={review} />
          ))}
        </ReviewsContainer>
      </CharacteristicsContainer>

      {renderReviewDialog()}
    </Container>
  );
}
