import styled from 'styled-components';

export const Container = styled.div`
  width: 500px;
  margin: 16px 1px;
`;

export const Image = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

export const Info = styled.div`
  flex: 1;
  padding: 2%;
`;

export const PlaceTitle = styled.h2`
  margin: 1% 0;
  color: #212121;
`;

export const PlaceSubtitle = styled.p`
  color: #757575;
`;

export const Message = styled.p`
  margin: 1% 0;
  color: ${props => props.color || '#212121'};
`;
