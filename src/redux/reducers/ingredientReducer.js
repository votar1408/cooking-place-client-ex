/* eslint-disable import/prefer-default-export */
import { INGREDIENTS_LOADED, ADD_INGREDIENT } from '../action-types';

const initialState = [];

const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENTS_LOADED:
      return action.payload;
    case ADD_INGREDIENT:
      return state.concat(action.payload);
    default:
      return state;
  }
};

export default ingredientReducer;
