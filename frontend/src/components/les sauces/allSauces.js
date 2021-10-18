import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from "react-router-dom";
import { getAllSauce } from '../../reducer/actions';
import Swal from 'sweetalert2';
class AllSauces extends Component {
  constructor (props) {
    super (props);
    this.voirSauce = this.voirSauce.bind(this)
  };

  // pour update 
  componentDidMount() {
    this.props.getAllSauce()
      .then( res => {
        console.log("new list of sauces ", this.props.sauces);
      })
      .catch (err => {
        console.log(err);
        Swal.fire("Problème de server, veuillez retenter plus tard")
      })
  }
  
  // function render les sauces 
  displaySauce () {
    // si pas de sauce, afficher "no Sauce"
    if (this.props.sauces.length === 0) {
      return (<div>No sauce </div>)
    }
    // afficher la liste des sauce
    else {
      return (
      <div className="flex mx-auto flex-wrap my-12 ">
        {this.props.sauces.map((sauce) => {
          return (
            <Link to={`/sauce/${sauce._id}`} key={sauce._id} onClick={(e) => this.voirSauce(e, sauce.userId, sauce._id)} className="mx-auto my-3 text-center p-2 hover:opacity-80 focus:opacity-80 ">
              
                <div 
                className="mx-auto w-80 h-80 p-5 text-center border border-black border-4 bg-white flex flex-col " >
                  {/* image sauce */}
                  <div className="p-1 w-64 h-64 border border-black border-2 mx-auto overflow-hidden ">
                    <img className="object-contain " 
                      src={sauce.imageUrl} alt="sauce "/>
                  </div>
                  
                  {/* name + heat */}
                  <div className="p-2 mx-auto ">
                    <p className="uppercase text-yellow-500 ">
                    {sauce.name}
                    </p>
                    <p className="mx-auto text-center text-red-500 ">
                    HEAT : {sauce.heat}
                    </p>
                  </div>
                  
                </div>
              
            </Link>
          )
        })}
      </div>)
    }
  };
  
  // function pour aller voir la sauce choisi
  voirSauce (e, userId, id) {
    console.log("sauce id ", id);
    // si le user n'est pas celui qui a crée la sauce
    // interdire action, rien ne passe
    console.log("id ", userId);
    console.log("userId ",this.props.auth.user.userId );
    if (this.props.auth.user.userId !== userId) {
      e.preventDefault()
      console.log("u not this user");
    }
    // // sinon, on redirect sur la page display de cette sauce
   
  };

  render() { 
    return (
      <div>{this.displaySauce()}</div>
    ) ;
  }
}

function mapToState (state) {
  return {
    sauces: state.sauces.sauces,
    auth: state.auth
  }
}
export default connect(mapToState, {getAllSauce})(withRouter(AllSauces)) ;