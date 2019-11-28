import * as actionTypes from '../actions/actionTypes';

const initalState = {
  search: [],
  favorites: [],
  nearby: [],
  favoritesWereFetched: false
};

const placesReducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SET_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, ...action.payload.places]
      };
    case actionTypes.SET_FAVORITES_FETCHED:
      return {
        ...state,
        favoritesWereFetched: action.payload.favoritesWereFetched
      };
    case actionTypes.SET_NEARBY_RESULTS:
      return {
        ...state,
        nearby: [...state.nearby, ...action.payload.places]
      };
    case actionTypes.SET_SEARCH_RESULTS:
      return {
        ...state,
        search: action.payload.places
      };
    default:
      return state;
  }
};

export default placesReducer;
