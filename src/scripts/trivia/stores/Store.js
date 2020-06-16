import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

function configureStore() {
  const enhancer = compose(applyMiddleware(thunkMiddleware));
  return createStore(rootReducer, enhancer);
}

export default configureStore;
