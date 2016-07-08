import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';/

// REMOVED import App from './components/app' -  app is rendered in seperate location due to react-router replacing it.
import { Router, browserHistory } from 'react-router';
//browserHistory - things after / 
//hashHistory - things after #
// import reducers from './reducers';
import routes from './routes';
// import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(
	promise
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
  , document.querySelector('.container'));
