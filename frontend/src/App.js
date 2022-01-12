// import logo from './logo.svg';

import './App.css';
import Navbar from './components/navbar'
import React, { Component } from 'react';
import { BrowserRouter , Route, Switch } from "react-router-dom";
import Inscription from './components/inscription';
import Connexion from './components/connexion';
import Home from './components/home';
import AddSauce from './components/les sauces/addSauce';
import Sauce from './components/les sauces/sauce'
import ModifySauce from './components/les sauces/modifySauce'

class App extends Component {
 
  render() { 
    
    return (
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/inscription" component={Inscription} />
            <Route path="/connexion" component={Connexion} />
            <Route path="/addsauce" component={AddSauce} />
            <Route path="/sauce/:id" component={Sauce} />
            <Route path="/modify/sauce/:id" component={ModifySauce} />
          </Switch>
          
        </BrowserRouter>

        
      </React.Fragment>
    )
  }
}
 
export default App;
