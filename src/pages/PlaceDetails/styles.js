import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 3%;
`;

export const PlaceHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PlaceInfo = styled.div`
  width: 50%;
  height: 100%;
  padding: 0 0 0 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const PlacePhoto = styled.img`
  width: 50%;
  height: 320px;
  object-fit: cover;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

export const CharacteristicsContainer = styled.div`
`;