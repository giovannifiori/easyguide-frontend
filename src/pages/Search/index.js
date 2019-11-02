import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  Snackbar
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import { Container } from './styles';

import PlaceList from '../../components/PlaceList';

import api from '../../services/api';

export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: ''
  });

  const searchPlaces = () => {
    if (!query) {
      setSnackbarState({
        open: true,
        message: 'Você precisa digitar algo para realizar uma busca!'
      });
      return;
    }
    setIsLoading(true);
    api
      .get('places/search', {
        params: {
          query
        }
      })
      .then(response => {
        setPlaces(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  };

  let pageMessage = '';
  if (places.length > 0) {
    pageMessage = 'Resultados da pesquisa:';
  }

  const handleInput = e => {
    if(e.which === 13) {
      searchPlaces();
      return;
    }
    setQuery(e.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarState({
      ...snackbarState,
      open: false
    });
  };

  const renderSnackbar = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={<span id="message-id">{snackbarState.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }

  return (
    <Container>
      <FormControl style={{marginBottom: 16}}>
        <InputLabel htmlFor="search-box">
          Digite aqui o nome do local que você está buscando...
        </InputLabel>
        <Input
          id="search-box"
          type="text"
          defaultValue={query}
          autoFocus
          onKeyDown={handleInput}
          style={{ width: '50%' }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="do search" onClick={searchPlaces}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <h2>{pageMessage}</h2>
      <PlaceList isLoading={isLoading} places={places} />
      {renderSnackbar()}
    </Container>
  );
}
