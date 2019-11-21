import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

export const Info = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

export const Image = styled.img`
  height: 160px;
  width: auto;
  border-radius: 50%;
  object-fit: cover;
  margin: 32px 64px 16px 0;
`;

export const Title = styled.h2`
  color: #212121;
`;
