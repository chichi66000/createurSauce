import React, { Component } from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import { login } from '../reducer/actions'
import { withRouter } from 'react-router-dom';

class Connexion extends Component {
  
  // construtor pour passer la valeau this au fonction 
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  // fonction pour submit le form
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });

    // envoyer au server grâce au action dispatch login
    this.props.login(this.state).then( 
      // si succès redirect au page Home avec le contenu de tous les sauces 
      (res) => { 
        console.log("log in ok");
        this.props.history.push("/")
      },
      
      // si error envoyer errror message
      (err) =>{
<<<<<<< HEAD
        console.log("err ", err);
        this.setState({ errors: err, isLoading: false });
        Swal.fire(`Email / Password invalid`)
=======
        this.setState({ errors: err.response.data.error, isLoading: false });
        Swal.fire(`${err.response.data.error}`)
>>>>>>> 2f9bdc88c9a41b2d167db25a3e32d22d66541838
      }
    )

  }
  
  // ecoute onchange de l'input et enregistrer value dans state
  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render() { 
    return (
      <form onSubmit = {(event) => this.handleSubmit(event)} className="md:w-3/4 lg:w-1/2 md:mx-auto my-5 bg-white border border-2 border-gray-200 p-2  rounded-xl mx-2 ">
        <h2 className="text-center my-5 text-xxl font-extrabold text-purple-900 ">Connexion</h2>

        {/* input email */}
        <div className="grid grid-row-2 md:grid-cols-3 gap-4 mb-5 mx-5 mb-5 mx-5">
          <label className=" bg-white md:px-2 font-extrabold text-purple-900 " htmlFor="email">Email</label>
          <input 
          required
          className="md:col-span-2 h-full w-full px-2 py-1 border-gray-700 border border-4 rounded rounded-lg   bg-gray-200 hover:shadow-lg hover:font-bold hover:border-purple-500   focus:shadow-lg focus:font-bold focus:border-purple-500" type="email" 
          name="email" id="email" placeholder="your email" 
          onChange = {this.onChange}
           />
        </div>

        {/* input password */}
        <div className="grid grid-row-2 md:grid-cols-3 gap-4 mb-5 mx-5">
          <label className="bg-white md:px-2 font-extrabold text-purple-900 " htmlFor="password">Password</label>
          <input className="md:col-span-2 h-full w-full px-2 py-1  border-gray-700 border border-4 rounded rounded-lg   bg-gray-200 hover:shadow-lg hover:font-bold hover:border-purple-500   focus:shadow-lg focus:font-bold focus:border-purple-500" type="password" 
          id="password" 
          name="password" 
          required
          onChange = {this.onChange}

           />
        </div>
        {/* button connexion */}
        <div className="text-center">
          <button type="submit" className="btn bg-violetClair text-white text-center w-32 mx-auto mt-3 mb-3 rounded rounded-xl shadow-2xl ring-purple-400 ring-2   hover:opacity-80 focus:opacity-80 hover:text-black focus:text-black ">LOGIN
          </button>
        </div>

      </form>

    ) 
  };
}

export default connect(null, {login} )(withRouter(Connexion)) ;