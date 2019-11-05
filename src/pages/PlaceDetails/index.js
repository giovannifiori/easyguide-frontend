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
  // const { place } = props;
  const place = {
    formatted_address:
      'Largo de São Sebastião - Centro, Manaus - AM, 69067-080',
    geometry: {
      location: {
        lat: -3.1302888,
        lng: -60.0234142
      },
      viewport: {
        northeast: {
          lat: -3.128947170107277,
          lng: -60.02209677010728
        },
        southwest: {
          lat: -3.131646829892722,
          lng: -60.02479642989272
        }
      }
    },
    icon:
      'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
    id: 'ee3d8280cad06b8371ec9e875a5c5e61a3318020',
    name: 'Teatro Amazonas',
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 2340,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/101304292213950258832/photos">Ale Goicochea</a>'
        ],
        photo_reference:
          'CmRaAAAACD8UsF_4fq05XOO_s7FL6EXT5X390CiaOAvWkS4FGauw_UftzCiQsIOp8EvrQE4RurDrLSxN6hNNw7p0XBDSHRU_KXfwkvKtoWJWl5FacjxUDUEqnMDV4i8vFRJeUrkrEhDeeSfZGBHprGJpvObL9Pj_GhRwp2FeUrgvssNpZM8KTr0xqf1kBQ',
        width: 4160
      }
    ],
    place_id: 'ChIJ5Ys6KX0FbJIRxouulmJ-cA0',
    plus_code: {
      compound_code: 'VX9G+VJ Centro, Manaus - AM',
      global_code: '678XVX9G+VJ'
    },
    rating: 4.8,
    reference: 'ChIJ5Ys6KX0FbJIRxouulmJ-cA0',
    types: ['tourist_attraction', 'point_of_interest', 'establishment'],
    user_ratings_total: 17883,
    totalAccessibilityReviews: 4,
    positiveOpinionsPercentage: 50
  };

  if (!place) {
    return null;
  }

  const isOpenNow = place.opening_hours && place.opening_hours.open_now;

  return (
    <Container>
      <PlaceHeader>
        <PlacePhoto
          src={
            props.photoreference
              ? `${BASE_API_URL}places/photo/${props.photoreference}`
              : 'https://abrilveja.files.wordpress.com/2017/05/teatroamazonas2.jpg?quality=70&strip=info&w=650&h=444'
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
          description={place.formatted_address}
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
