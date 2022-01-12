import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import { likeSauce } from '../../reducer/actions';
import {axiosInstance} from '../../axios';
import Swal from 'sweetalert2';
class Sauce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sauce: {},
      id: this.props.match.params.id,
      like: 0,
    }
    
    this.onDelete = this.onDelete.bind(this)
    this.onLiked = this.onLiked.bind(this)
    this.onDisliked = this.onDisliked.bind(this)
    this.getOneSauce = this.getOneSauce.bind(this)
  };

  //componentDidMount
  componentDidMount() {
    this.getOneSauce()
  };

  // recupérer la sauce avec id du params depuis le state
  async getOneSauce () {
    await axiosInstance.get(`/api/sauces/${this.state.id}`)
      .then( res => {
        // console.log(res.data);
        this.setState({sauce: res.data})
      })
      .catch (err => {console.log("Erreur pour récupérer cette sauce");})
  };

  // function pour like la sauce
  onLiked = async () => {
    // filter si dans la liste des userLiked a ce user, puis stocké dans newArray 
    let usersLikesArray = this.state.sauce.usersLiked.filter( usersLiked => usersLiked === this.props.auth.user.userId)
    let usersDislikesArray = this.state.sauce.usersDisliked.filter (usersDisliked => usersDisliked === this.props.auth.user.userId)

    // si pas user dans array like et dislike, => on ajoute dans la list avec appel API 
    if (usersLikesArray.length === 0 && ( usersDislikesArray !== 0 || usersDislikesArray === 0)) {
      await this.setState({ like: 1})
    }
    else {
      console.log("new array 1 ", usersLikesArray);
      await this.setState({like: 0})
    }
    // envoyer par API
    await this.props.likeSauce(this.state.id, this.state.like, this.props.auth.user.userId)
    .then( res => {
      console.log(res);
      this.getOneSauce()
    })
    .catch(err => {console.log(err);})
  };

  // function pour disliked la sauce
  onDisliked = async() => {
    // filter si dans la liste des userLiked a ce user, puis stocké dans newArray 
    
    let newArray = this.state.sauce.usersDisliked.filter( usersDisliked => usersDisliked === this.props.auth.user.userId)

    // si pas user dans newArray, => on ajoute dans la list avec appel API 
    if (newArray.length === 0) {
      await this.setState({ like: -1})
    }
    else {
      await this.setState({like: 0})
    }
    // envoyer par API avec action likeSauce
    await this.props.likeSauce(this.state.id, this.state.like, this.props.auth.user.userId)
    .then( res => {
      console.log(res);
      this.getOneSauce()
    })
    .catch(err => {console.log(err);})
  };

  // function pour delete la sauce avec id
  onDelete = async () => {
    axiosInstance.delete(`/api/sauces/${this.state.id}`)
    .then( res => {
      console.log(res);
      Swal.fire("Sauce supprimée")
      this.props.history.push('/')
    })
    .catch (err => {
      console.log(err);
      Swal.fire("Erreur. Retenter plus tard")
    })
  };

  
  // render 
  render() { 
    
    return (
      <div>
        {/* afficher la sauce choisir avec id */}
        
        <div className="flex flex-col md:flex-row mx-2 lg:w-3/4 lg:mx-auto my-12 p-2 bg-white ">
          {/* Image à gauche */}
          <img className="md:mr-5 p-2 w-full md:w-8/12 lg:w-1/2 border border-2 text-center object-contain " src={this.state.sauce.imageUrl} alt={this.state.sauce.name} />

          {/* description du sauce à droite + button */}
          <div className="ml-2 md:ml-5 p-2 ">
            <h2 className="uppercase text-yellow-500 ">Name: {this.state.sauce.name}</h2>
            <h5 className="italic text-sm font-bold ">Fait par: {this.state.sauce.manufacturer} </h5>
            <h4 className="italic text-md font-bold text-purple-500 "> Description: <br/>
              <span className="text-lg text-black text-lg "> {this.state.sauce.description} </span>
            </h4>
            {/* button liked et disliked */}
            <div className="mx-auto ">
              <button className="mx-5 p-3"
              >
                <ThumbUpIcon onClick = {this.onLiked} className="h-7 w-7 text-blue-500 hover:text-green-500 focus:text-green-500 " />
                <span> {this.state.sauce.likes} </span>
              </button>

              <button className="mx-5 p-3"
              onClick = {this.onDisliked}>
                <ThumbDownIcon className="h-7 w-7 text-current-color hover:text-red-500 "/>
                <span> {this.state.sauce.dislikes} </span>
              </button>
            </div>

            {/* button modify, delete, et back */}
            <div className="flex flex-wrap my-2 ">

                {/* button modify */}
              <Link to = {`/modify/sauce/${this.state.id}`}>
                <button className="bg-purple-500 text-white hover:text-black hover:opacity-80 focus:text-black focus:opacity-80 border border-2 border-black p-2  w-28 my-2 mx-3 rounded rounded-lg ring ring-purple-600 ring-offset-2 ring-offset-purple-100 "
                onClick={this.onModify}>
                  Modify
                </button>
              </Link>

                {/* button delete */}
              <button className="bg-red-500 text-white hover:text-black hover:opacity-80 focus:text-black focus:opacity-80 border border-2 border-black p-2  w-28 my-2 mx-3  rounded rounded-lg ring ring-red-500 ring-offset-2 ring-offset-red-100 "
              onClick={this.onDelete}>
                Delete
              </button>

                {/* button Back */}
              <Link to="/" >
                <button className=" hover:text-yellow-500 hover:opacity-80 focus:text-yellow-500 focus:opacity-80 border border-2 border-black p-2  w-28 my-2 mx-3  rounded rounded-lg ring ring-gray-500 ring-offset-2 ring-offset-gray-100 "
                >
                  Back
                </button>
              </Link>
            </div>
          </div>
            
        </div>
        
      </div>
    )
  }
}

function mapToState(state) {
  return {
    auth: state.auth,
    sauces: state.sauces
  }
}
export default connect(mapToState, { likeSauce })(withRouter(Sauce)) ;