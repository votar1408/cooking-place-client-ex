import {
  SEARCHING,
  LOADING,
  ADD_TOAST,
  REMOVE_TOAST,
  INGREDIENTS_LOADED,
  ADD_INGREDIENT
} from '../action-types';

const ingredientsLoadedAction = newIngredients => {
  return {
    type: INGREDIENTS_LOADED,
    payload: newIngredients
  };
};

const addIngredientAction = newIngredient => {
  return {
    type: ADD_INGREDIENT,
    payload: newIngredient
  };
};

const searching = searchValue => {
  return {
    type: SEARCHING,
    payload: searchValue
  };
};

const loadingAction = value => {
  return {
    type: LOADING,
    payload: value
  };
};

const addToastAction = (message, type) => {
  const bodyMessage = {
    type,
    message,
    time: Date.now()
  };
  return {
    type: ADD_TOAST,
    payload: bodyMessage
  };
};

const removeToastAction = value => {
  return {
    type: REMOVE_TOAST,
    payload: value
  };
};

export {
  removeToastAction,
  searching,
  loadingAction,
  addToastAction,
  ingredientsLoadedAction,
  addIngredientAction
};
