import React from 'react';

import { Message } from './styles';

export default function AccessibilityMessage(props) {
  let message = 'Local ainda não avaliado.';
  let textColor = '#212121';
  let percentage = props.positiveOpinionsPercentage || 0;
  percentage = percentage.toFixed(2);
  if (props.totalReviews) {
    if (percentage < 30) {
      message = `Somente ${percentage}% das pessoas consideram esse lugar parcial ou totalmente acessível!`;
      textColor = '#CE2F19';
    } else {
      message = `${percentage}% das pessoas consideram esse lugar parcial ou totalmente acessível!`;
      textColor = '#4B8F39';
    }
  }
  return (
    <Message color={textColor} {...props}>
      {message}
    </Message>
  );
}
