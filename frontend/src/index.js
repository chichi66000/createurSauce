import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// creer store avec redux
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducer/index';

// history pour naviger 
import { createBrowserHistory } from 'history'

import { BrowserRouter as Router } from 'react-router-dom';

// pour decode token et mettre dans le store state
import jwt_decode from 'jwt-decode';
import { add_current_user } from './reducer/actions';
import setAuthorization from './utils/setAuthorization'


const history = createBrowserHistory();
const store = createStore(allReducers, applyMiddleware(thunk))

store.subscribe ( () => {
  console.log("state change ", store.getState());
})

// set headet Authorisation pour les appels API
if (localStorage.jwtToken) {
  setAuthorization(localStorage.jwtToken);
  store.dispatch(add_current_user(jwt_decode(localStorage.jwtToken)))
}

ReactDOM.render(
  <Provider store = {store} >
    <Router>
      <App history = {history} />
    </Router>
    
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
