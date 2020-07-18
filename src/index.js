import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import RootReducer from './reducers/RootReducer';
import App from './App';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import RootSaga from './sagas/RootSaga';
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(RootReducer, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(RootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
