import styled from 'styled-components';

export const Container = styled.div`
  height: 8vh;
  min-height: 80px;
  padding: 0 30px;
  background: #3f51b5;
  color: #fff;
  user-select: none;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UnorderedList = styled.ul`
  display: flex;
  align-items: center;
`;

export const ListItem = styled.li`
  text-decoration: none;
  margin: 0 18px;

  a {
    text-decoration: none;
    font-size: 1.125rem;
    color: #fff;
  }

  a:hover,
  a:active,
  a.active {
    #color: #ffc107;
  }
`;
