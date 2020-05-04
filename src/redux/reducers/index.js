import { combineReducers } from 'redux';
import appReducer from './appReducer';
import ingredientReducer from './ingredientReducer';

const reducer = combineReducers({
  otherData: appReducer,
  ingredients: ingredientReducer
});

export default reducer;
