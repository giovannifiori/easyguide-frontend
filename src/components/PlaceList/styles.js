import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: ${props => props.isLoading ? 'center' : 'stretch' };
  justify-content: ${props => props.isLoading ? 'center' : 'space-between' };
  margin: 16px 0;
  flex-wrap: wrap;
`;