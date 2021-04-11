import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './redux';

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger())
);
