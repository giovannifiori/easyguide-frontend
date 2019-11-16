import React from 'react';
import { Button } from '@material-ui/core';

import {
  Container,
  PlaceHeader,
  PlaceInfo,
  PlacePhoto,
  ButtonContainer,
  CharacteristicsContainer
} from './styles';

import Characteristic from '../../components/Characteristic';
import AccessibilityMessage from '../../components/AccessibilityMessage';

import { BASE_API_URL } from '../../config/constants';
import PlaceHolder from '../../assets/img/logo.png';

export default function PlaceDetails(props) {
  const { place } = props.history.location.state;

  if (!place) {
    return null;
  }

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
            >
              Publicar avaliação
            </Button>
          </ButtonContainer>
        </PlaceInfo>
      </PlaceHeader>

      <CharacteristicsContainer>
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
          description={place.rating}
        />
        <Characteristic
          title={`Avaliações dos usuários (${place.totalAccessibilityReviews})`}
        />
      </CharacteristicsContainer>
    </Container>
  );
}
