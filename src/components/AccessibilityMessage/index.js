import React from 'react';

import { Message } from './styles';

export default function AccessibilityMessage(props) {
  let message = 'Local ainda não avaliado.';
  let textColor = '#212121';
  if (props.totalReviews) {
    if (props.positiveOpinionsPercentage < 30) {
      message = `Somente ${props.positiveOpinionsPercentage}% das pessoas consideram esse lugar parcial ou totalmente acessível!`;
      textColor = '#CE2F19';
    } else {
      message = `${props.positiveOpinionsPercentage}% das pessoas consideram esse lugar parcial ou totalmente acessível!`;
      textColor = '#4B8F39';
    }
  }
  return <Message color={textColor} {...props}>{message}</Message>;
}
