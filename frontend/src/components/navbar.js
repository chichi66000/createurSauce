import React, { Component } from 'react';
import flame from '../images/flame_bg.png';
import { Link} from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../reducer/actions';
import { ViewListIcon, LogoutIcon } from '@heroicons/react/solid';
class Navbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.toggleButton = this.toggleButton.bind(this);
    this.logout = this.logout.bind(this)
  };

  logout (e) {
    e.preventDefault();
    this.props.logout();
    
  };

  // button toggle navbar
  toggleButton () {
    this.setState({isOpen : !this.state.isOpen})
  };

  // display className pour le menu responsive
  getClassName () {
    let classes = "md:inline md:flex md:flex-row md:self-center text-lg md:mx-auto ";
    classes += this.state.isOpen? "block" : "hidden md:block"
    return classes
  };
  render() { 
    const { isAuthenticated } = this.props.auth;

    //render pour le contenu user privé avec lien logout
    const userLinks = (
      <ul className="w-16 text-right">
        <li className = "block hover:underline hover:opacity-80 focus:underline focus:opacity-80 hover:text-white focus:text-white p-2 hover:bg-gray-700 focus:bg-gray-700 rounded  " >
        <Link to="/"  
        onClick={this.logout} >
          <LogoutIcon className = "w-8 h-auto " />
        </Link>
        
        </li>
      </ul>
    ); 
    // render pour le contenu public avec lien inscripton et connexion
    const guestLinks = (
      <ul className="text-right ">
        {/* button Inscription */}
        <li className="block hover:underline hover:opacity-80 focus:underline focus:opacity-80 hover:text-white focus:text-white  px-2 py-1 md:inline  md:px-5" >
          <Link to="/inscription" className = " hover:bg-gray-700 focus:bg-gray-700 rounded rounded-lg py-2 px-5 ">Inscription</Link>
        </li>
        {/* button Connexion */}
        <li className="block hover:underline hover:opacity-80 focus:underline focus:opacity-80 hover:text-white focus:text-white px-2 py-1 md:inline  md:px-5">
          <Link to="/connexion" className = "hover:bg-gray-700 focus:bg-gray-700 rounded rounded-lg py-2 px-5">Connexion</Link>
        </li>
      </ul>
    );

    //render pour link tous les sauces après login
    const displaySauces = (
      <ul className="">
        <li className="block hover:underline hover:opacity-80 focus:underline focus:opacity-80 hover:text-white focus:text-white px-2 py-1  md:inline w-52 hover:bg-gray-700 focus:bg-gray-700 rounded rounded-lg ">
        <Link to="/" className = "py-2 px-2">HOME</Link>
        </li>
        <li className="block hover:underline hover:opacity-80 focus:underline focus:opacity-80 hover:text-white focus:text-white px-2 py-1  md:inline w-52 hover:bg-gray-700 focus:bg-gray-700 rounded rounded-lg  ">
          <Link to="/addsauce" className = "py-2 px-2">Ajouter une sauce</Link>
        </li>
        
      </ul>
    );
    

    return (
      <div className="container-fluid bg-pink-300 mx-auto flex flex-col md:flex-row text-lg ">

        {/* logo + image */}
        <div className="flex justify-betwen  mb-2 p-2 ">
          {/* logo + image */}
          <div className = "mx-auto text-center flex justify-between " >
            <img className="object-fit w-12" src= {flame} alt ="logo flame Piquante"/>
            <h1 className= "font-bold align-self-center text-red-piquant text-3xl ">Piquante <br/>
              <span className= "text-sm">La meilleur application de notation de sauces</span>
            </h1>
          </div>
          {/* button menu hamburger */}
          <button onClick={this.toggleButton} className=" md:hidden  " tabIndex="-1  ">
            <ViewListIcon className="w-12 p-2 mr-1 hover:opacity-80 hover:bg-yellow-400 text-gray-500 focus:opacity-80 focus:bg-yellow-400 border border-2 border-gray-500 rounded-lg shadow" />
          </button>

        </div>
        
        {/* Les links */}
        <div id="links" className={this.getClassName()} >
          {/* display link pour les sauces */}
          <div className="px-2 pt-2 "> {isAuthenticated ? displaySauces : <div style={{display:'none'}}></div> } </div>
          
          {/* Les liens Inscription et Connexion ou LogOut */}
          <div className="p-2 -mt-2 md:justify-self-end"> {isAuthenticated ? userLinks : guestLinks } </div>

        </div>
        
          
      </div>
    )
  }
}

function mapToState (state) {
  return { auth: state.auth } 
}
export default connect(mapToState, { logout })(Navbar) ;