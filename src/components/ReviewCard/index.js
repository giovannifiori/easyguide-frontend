import React from 'react';

import { Container, Header, Author, Opinion } from './styles';
import { Card } from '@material-ui/core';

export default function ReviewCard(props) {
  const { review } = props;

  const renderOpinion = opinion => {
    switch (opinion) {
      case 'NO':
        return 'Não considera esse local acessível.';
      case 'PARTIALLY':
        return 'Considera esse local parcialmente acessível.';
      case 'YES':
        return 'Considera esse local acessível.';
      default:
        return null;
    }
  };

  return (
    <Container>
      <Card style={{ padding: 16 }}>
        <Header>
          <Author>{review.author || 'Usuário anônimo'}</Author>
          <span>
            {Intl.DateTimeFormat('pt-BR').format(new Date(review.createdAt))}
          </span>
        </Header>
        <Opinion>{renderOpinion(review.is_accessible)}</Opinion>
        <p>{review.text}</p>
      </Card>
    </Container>
  );
}
