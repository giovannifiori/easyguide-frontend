//this is the places action creator
import * as actionTypes from './actionTypes';

export const setFavorites = places => {
  return {
    type: actionTypes.SET_FAVORITES,
    payload: {
      places
    }
  };
};

export const addToFavorites = place => {
  return {
    type: actionTypes.ADD_TO_FAVORITES,
    payload: {
      place
    }
  };
};

export const removeFromFavorites = place => {
  return {
    type: actionTypes.REMOVE_FROM_FAVORITES,
    payload: {
      place
    }
  };
};

export const setSearchResults = places => {
  return {
    type: actionTypes.SET_SEARCH_RESULTS,
    payload: {
      places
    }
  };
};

export const setNearbyResults = places => {
  return {
    type: actionTypes.SET_NEARBY_RESULTS,
    payload: {
      places
    }
  };
};

export const setFavoritesWereFetched = favoritesWereFetched => {
  return {
    type: actionTypes.SET_FAVORITES_FETCHED,
    payload: {
      favoritesWereFetched
    }
  };
};
