import React,{Component} from 'react';
import { connect } from 'react-redux';
import AllSauces from './les sauces/allSauces';

import Connexion from './connexion';
class Home extends Component {
  
  
  render() { 
  const { isAuthenticated } = this.props.auth;

    return (
      // display les sauces suivant état authenticated du user; demander connexion s'il aut
      <div className="bg-redPiquant " > {isAuthenticated? <AllSauces/> : <Connexion/>} </div>
    ) 
  }
}

function mapToState (state) {
  return {
    sauces: state.sauces,
    auth: state.auth
  }
}
export default connect(mapToState)(Home) ;


