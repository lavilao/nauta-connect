import { createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { applyMiddleware } from 'redux';
import reducers from './reducers';
import loggerMiddleware from './middlewares/logger';
import protectActions from './middlewares/protectActions';
import identityGenerator from './middlewares/identity';

const store = createStore(reducers, applyMiddleware(
  thunk,
  loggerMiddleware,
  identityGenerator,
  protectActions
));

export default store;