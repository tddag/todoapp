import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import tasksReducer from './reducers';
// import { devToolsEnhancer } from 'redux-devtools-extension';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from './middleware/logger';
import analytics from './middleware/analytics';
import apiMiddleware from './middleware/api';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = (state = {}, action) => {
  return {
    tasks: tasksReducer(state.tasks, action),
  };
};

// const store = createStore(tasks, devToolsEnhancer() );
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware, apiMiddleware, logger, analytics)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render (
      <Provider store={store}> <NextApp/> </Provider>,
      document.getElementById('root')
    );
  });
  
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  })
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
