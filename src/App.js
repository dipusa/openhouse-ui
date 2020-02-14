import React from 'react';
import './App.css';
import LoginPage from "./containers/Login"
import MainContainer from "./containers/MainContainer"
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from 'react-router';
import 'antd/dist/antd.css';
import 'reset-css/reset.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route path="/" component={MainContainer}  />
            </Switch>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
