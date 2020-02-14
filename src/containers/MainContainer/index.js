import React, { Component, Suspense } from "react";
import { Redirect, Switch, withRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { connect } from "react-redux";
import Dashboard from "../Dashboard"
import Header from "../../components/Header";
import "./styles.scss"


class MainContainer extends Component {
   
    componentDidMount() {
        let authToken = ''
        authToken = localStorage.getItem('accessToken');
        if(authToken) {
            //this.props.getAllPlants()
        }
        else {
          
          this.props.history.push('/login');
        }
    }
    signOut = () => {
        localStorage.clear()
        window.location.reload();
    }

    
   
    render(){
        return (
            <div className="container">
              <Header logout={this.signOut}/>
              <div className="page-holder">
                <Switch> 
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
                </Switch>
              </div>
                
            </div>
        )
    }
}


const mapStateToProps = (state) => {
  return {
  
  };
};
const mapDispatchToProps = dispatch => {
  return {
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainContainer))