import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';
import { createBrowserHistory } from 'history';
import NetworkService from "./NetworkService";
import * as serviceWorker from './serviceWorker';
import userDetails from "./store/reducers/loginReducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();
const store = createStore(
    combineReducers({
        "userDetails": userDetails
    }),
    composeEnhancers(applyMiddleware(thunk))
);

NetworkService.setupInterceptors(store);
if (window.localStorage.getItem("authToken")) {
      axios.defaults.headers.common["X-Access-Token"] = `token ${localStorage.getItem("authToken")}`;
}
ReactDOM.render(
   <BrowserRouter>
        <Provider store={store}>
            <App history={history} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));

window.addEventListener('storage', (e) => {
  // logout from one tabs and login refreashes other tabs
  if ((e.key === null && e.newValue === null && e.oldValue === null) ||
      (e.key === 'authToken' && e.oldValue === null && e.newValue !== null)) {
    window.location.reload();
  }
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
