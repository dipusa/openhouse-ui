import React from 'react';
import './App.css';
import LoginPage from "./containers/Login"
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from 'react-router';
import 'antd/dist/antd.css'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                {/*<Route path="/" component={MainContainer}  />*/}
            </Switch>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
