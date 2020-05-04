/* eslint-disable no-underscore-dangle */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducers';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.REDUX_DEVTOOLS_EXTENSION ? window.REDUX_DEVTOOLS_EXTENSION() : f => f
  )
);

export default store;
