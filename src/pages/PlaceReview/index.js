import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup,
  Checkbox,
  TextField
} from '@material-ui/core';

import { Container, StepContainer } from './styles';

import api from '../../services/api';
import * as firebase from 'firebase/app';

function getSteps() {
  return ['É acessível?', 'Destaques', 'Comentário'];
}

export default function PlaceReview(props) {
  const currentUser = firebase.auth().currentUser || {};

  const [activeStep, setActiveStep] = useState(0);
  const [disabilities, setDisabilities] = useState([]);
  const [review, setReview] = useState({
    isAccessible: '',
    userId: currentUser.uid,
    text: '',
    highlights: []
  });
  const steps = getSteps();

  const isLastStep = () => {
    return activeStep === getSteps().length - 1;
  };

  useEffect(() => {
    api
      .get('disabilities')
      .then(response => {
        setDisabilities(response.data);
      })
      .catch(e => alert('error'));
  }, []);

  const sendReview = () => {
    api
      .post(`places/${props.placeId}/reviews`, review)
      .then(response => {
        alert('avaliado!');
      })
      .catch(e => alert('falha ao avaliar'));
  };

  const handleNext = () => {
    if (activeStep === 0 && !review.isAccessible) return;
    if (isLastStep()) {
      sendReview();
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleRadioChange = event => {
    setReview({
      ...review,
      isAccessible: event.target.value
    });
  };

  const handleHighlightChange = event => {
    const id = parseInt(event.target.value);
    const checked = event.target.checked;

    console.log(`Setting ${id} as ${checked}`);

    if (checked) {
      setReview({
        ...review,
        highlights: [...review.highlights, id]
      });
    } else {
      setReview({
        ...review,
        highlights: review.highlights.filter(h => h !== id)
      });
    }
  };

  const renderFirstStep = () => {
    return (
      <StepContainer>
        <h3>Você considera esse local acessível?</h3>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="isAccessible"
            row
            value={review.isAccessible}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="NO" control={<Radio />} label="Não" />
            <FormControlLabel
              value="PARTIALLY"
              control={<Radio />}
              label="Parcialmente"
            />
            <FormControlLabel value="YES" control={<Radio />} label="Sim" />
          </RadioGroup>
        </FormControl>
      </StepContainer>
    );
  };

  const renderHighlightsStep = () => {
    return (
      <StepContainer>
        <h3 style={{ marginBottom: 24 }}>
          Selecione os itens que você considera como destaques positivos nesse
          local.
        </h3>
        <FormControl component="fieldset">
          {disabilities.map(disability => (
            <>
              <FormLabel component="legend">{disability.name}</FormLabel>
              <FormGroup style={{ marginBottom: 24 }}>
                {disability.items.map(item => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={review.highlights.indexOf(item.id) !== -1}
                        value={item.id}
                        onChange={handleHighlightChange}
                      />
                    }
                    label={item.name}
                  />
                ))}
              </FormGroup>
            </>
          ))}
        </FormControl>
      </StepContainer>
    );
  };

  const renderCommentStep = () => {
    return (
      <StepContainer>
        <h3>Deixe seu comentário.</h3>
        <p>
          O seu comentário será publicado para todos os usuários do app. Faça um
          comentário relevante sobre o local que possa ajudá-los, seja um
          elogio, reclamação ou sugestão.
        </p>
        <TextField
          id="text"
          multiline
          rows="4"
          value={review.text}
          onChange={event => setReview({ ...review, text: event.target.value })}
          margin="normal"
          variant="outlined"
          fullWidth
        />
      </StepContainer>
    );
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return renderFirstStep();
      case 1:
        return renderHighlightsStep();
      case 2:
        return renderCommentStep();
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography>Avaliação completada!</Typography>
            <Button onClick={props.onReviewFinished}>Fechar</Button>
          </div>
        ) : (
          <div>
            <Typography>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Anterior
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
