import styled from 'styled-components';

export const Message = styled.h3`
  margin: 1% 0;
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '1rem')}
  color: ${props => props.color || '#212121'};
`;
