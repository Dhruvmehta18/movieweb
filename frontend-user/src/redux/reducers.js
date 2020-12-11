import * as actionTypes from "./actionTypes";
import {LOADED, LOADING, ERROR} from "../constants/constants";
 
const initialState ={
  carouselShelf:{
    requestState: LOADING,
    data: [],
    error: null
  }
}

function reducer(state = initialState, action){
switch (action.type) {
    case actionTypes.ADD_CAROUSELS_SHELF:
      return {
        ...state,
        carouselShelf:{
          requestState: LOADED,
          data:[
            ...action.carouselList
          ],
          error: null
        }
      }
    case actionTypes.LOADING_CAROUSELS_SHELF:
      return {
        ...state,
        carouselShelf:{
          requestState: LOADING,
          data: [
            ...action.carouselList
          ],
          error: null
        }
      }
      case actionTypes.ERROR_CAROUSELS_SHELF:
        return {
          ...state,
          carouselShelf:{
            requestState: ERROR,
            data: [],
            error: {
              ...action.error
            }
          }
        }
    default:
      return state
  }
}

export default reducer;