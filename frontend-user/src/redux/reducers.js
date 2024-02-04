import * as actionTypes from "./actionTypes";
import {ERROR, LOADED, LOADING} from "../constants/constants";

const initialState = {
  carouselShelf: {
    requestState: LOADING,
    data: [],
    error: null,
  },
  advCarousel: {
    requestState: LOADING,
    data: [],
    error: null,
  },
  movie_detail: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_ADV_CAROUSEL_LIST:
      return {
        ...state,
        advCarousel: {
          requestState: LOADED,
          data: [...action.advCarouselList],
          error: null,
        },
      };
    case actionTypes.LOADING_ADV_CAROUSEL_LIST:
      return {
        ...state,
        advCarousel: {
          requestState: LOADING,
          data: [...action.advCarouselList],
          error: null,
        },
      };
    case actionTypes.ERROR_ADV_CAROUSEL_LIST:
      return {
        ...state,
        advCarousel: {
          requestState: ERROR,
          data: [],
          error: {
            ...action.error,
          },
        },
      };
    case actionTypes.ADD_CAROUSELS_SHELF:
      return {
        ...state,
        carouselShelf: {
          requestState: LOADED,
          data: [...action.carouselList],
          error: null,
        },
      };
    case actionTypes.LOADING_CAROUSELS_SHELF:
      return {
        ...state,
        carouselShelf: {
          requestState: LOADING,
          data: [...action.carouselList],
          error: null,
        },
      };
    case actionTypes.ERROR_CAROUSELS_SHELF:
      return {
        ...state,
        carouselShelf: {
          requestState: ERROR,
          data: [],
          error: {
            ...action.error,
          },
        },
      };
    case actionTypes.ADD_MOVIE:
      return {
        ...state,
        movie_detail: [
          ...state.movie_detail,
          {
            requestState: LOADED,
            data: {...action.movie},
            error: null,
          }
        ]
      };
    case actionTypes.LOADING_MOVIE:
      return {
        ...state,
        movie_detail: [
          ...state.movie_detail,
          {
            requestState: ERROR,
            data: {},
            error: {
              ...action.error,
            },
          }
        ]
      }
    default:
      return state;
  }
}

export default reducer;
