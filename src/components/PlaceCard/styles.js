import styled from 'styled-components';
import { Card } from '@material-ui/core';

export const Container = styled(Card)`
  width: 100%;
  min-height: 120px;
  margin: 16px 1px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PlaceTitle = styled.h2`
  margin: 1% 0;
  color: #212121;
`;

export const PlaceSubtitle = styled.p`
  color: #757575;
`;
