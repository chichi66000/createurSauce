import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { axiosInstance } from '../../axios';
import { modifySauce } from '../../reducer/actions';

import Swal from 'sweetalert2';

class ModifySauce extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      manufacturer : "",
      description: '',
      mainPepper: '',
      heat: "",
      imageUrl: '',
      id: this.props.match.params.id,
      imgURI: null
    };
    this.loadFile = this.loadFile.bind(this);
    this.onSubmitModify = this.onSubmitModify.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.chooseFile = this.chooseFile.bind(this)
    this.readURI = this.readURI.bind(this)
  };

  // componentDidMount
  componentDidMount () {
    this.getOneSauce()
  };

  //récupérer la sauce avec son id
  async getOneSauce () {
    await axiosInstance.get(`/api/sauces/${this.state.id}`)
      // récupérer les information puis stocker dans state
      .then( res => {
        this.setState({name: res.data.name})
        this.setState({manufacturer: res.data.manufacturer})
        this.setState({description: res.data.description})
        this.setState({imageUrl: res.data.imageUrl})
        this.setState({mainPepper: res.data.mainPepper})
        this.setState({heat: res.data.heat})

      })
      .catch (err => {console.log("Erreur pour récupérer cette sauce");})
  };

  // handlechange pour récupérer les valeurs des inputs
  handleChange (e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  };

  // function quand on click sur button add image qui déclenche loadFile
  // async chooseFile () {
  //   document.getElementById('image').click()
  //   console.log("im click ");
  // };

  // function pour récupérer URI image pour preview image
  readURI= async (e) => {
    // s'il y a image, on stock cette image dans le state pour preview
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (event) {
        this.setState({imageURI : event.target.result})
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }

  }

  // upload image: récupérer image d'origin, puis changer avec image modifiée
  loadFile = async (e) => {
    //changer image d'origine 
    await this.setState({imageUrl: e.target.files[0]});
    // preview image modifié
    this.readURI(e)
  };

  // submit form pour modify la sauce
  onSubmitModify = async (event) => {
    event.preventDefault();
    const data = new FormData();
    // inserer les infos dans data avant envoyer au server
    data.append('name', this.state.name)
    data.append('manufacturer', this.state.manufacturer)
    data.append('mainPepper', this.state.mainPepper)
    data.append('description', this.state.description)
    data.append('heat', this.state.heat)
    data.append('image', this.state.imageUrl)
    // envoyer au server
    await axiosInstance.put(`/api/sauces/${this.state.id}`, data)
    .then( res => {
      console.log(res);
      Swal.fire('Sauce modifié')
      this.props.history.push('/')
    })
    .catch( err => {
      console.log(err);
      Swal.fire("Erreur. Retenter plus tard")})
  };

  render() { 
    return (
      <form className="lg:w-3/4 mx-2 md:mx-auto my-5 bg-white p-2 rounded " 
      onSubmit= {(event) => this.onSubmitModify(event)}
      method="post" encType="multipart/form-data" >
        <h3 className="text-yellow-500 mx-auto p-2 my-2 text-center font-semibold text-3xl ">Modifier votre sauce </h3>

        {/* input name */}
        <div className="p-2 my-1 ">
          <label className="text-violetClair " htmlFor="name" >Name</label>
          <input className="mx-auto h-full w-full px-2 transition-all border-gray-500 border-2 rounded-sm bg-white focus:bg-gray-100 "
          id="name" type="text"
          name="name"
          value= {this.state.name || ""}
          onChange={this.handleChange}
          />
        </div>

        {/* input manufacturer */}
        <div className="p-2 my-1 ">
          <label className="text-violetClair " htmlFor="manufacturer" >Manufacturer</label>
          <input className="mx-auto h-full w-full px-2 transition-all border-gray-500 border-2 rounded-sm bg-white focus:bg-gray-100 "  id="manufacturer" type="text" name="manufacturer"
          value= {this.state.manufacturer || ""}
          onChange={this.handleChange} />
        </div>

        {/* input description */}
        <div className="p-2 my-1 ">
          <label className="text-violetClair " htmlFor="description" >Description</label>
          <input className="mx-auto h-full w-full px-2 transition-all border-gray-500 border-2 rounded-sm bg-white focus:bg-gray-100 " id="description" type="text"  name="description"
          value= {this.state.description || ""}
          onChange={this.handleChange} />
        </div>

        {/* button add image */}
        <div className="p-2 my-1 flex flex-wrap ">
          <div className="mr-5 ">
            <input id="image" type="file" accept=".jpg, .jpeg, .png" name="image" 
            onChange= {(e) => this.loadFile(e)}  />
          </div>

          {/* image: s'il y a nouvelle image, afficher; sinon afficher mage d'origine */}
          <div >
            {this.state.imageURI ? (<img id="outputImg" className="w-28 p-2 border border-gray-200 rounded  object-contain " src= {this.state.imageURI || ""} alt="sauce added"/>) : (<img className="w-28 p-2 border border-gray-200 rounded  object-contain " src={this.state.imageUrl} alt = {this.state.name} />) }
          </div>
          
        </div>
        

        {/* input ingredient */}
        <div className="p-2 my-1 " >
          <label className="text-violetClair "  htmlFor="ingredient" >Main Peppers Ingrédients</label>
          <input className="mx-auto h-full w-full px-2 transition-all border-gray-500 border-2 rounded-sm bg-white focus:bg-gray-100 " id="ingredient" type="text" name="mainPepper"
          value= {this.state.mainPepper || ""}
          onChange= {this.handleChange} />
        </div>

        {/* bar progression pour Heat */}
        <div className="flex flex-col mx-auto px-5 py-2 my-1 ">
          <label  htmlFor="heat"className="text-violetClair " >HEAT</label>
          <div className="flex flex-col-reverse md:flex-row justify-between " >
            <input type="range" className="mr-2 my-1 md:w-3/4 " min="1" max="10" id="heat" name="heat"  value = {this.state.heat || ""} 
            onChange = {this.handleChange} />
            <input type="number" min="1" max="10" className="w-16 rounded text-center text-base border border-black border-4 px-2 py-1 my-2 focus:bg-gray-200 focus:opacity-80 " name="heat"  value = {this.state.heat || ""}
            onChange = {this.handleChange} />
          </div>
          
        </div>
        
        {/* button submit */}
        <div className="text-center p-2 my-2">
          <button className="bg-violetClair text-white text-center w-32 mx-auto mt-3 mb-3 rounded rounded-xl shadow-2xl ring-purple-400 ring-2   hover:opacity-80 focus:opacity-80 hover:text-black focus:text-black " type="submit" >SUBMIT</button>
        </div>
        
      </form>
    ) 
  }
}

function mapToState (state) {
  console.log("state dans ");
  return {
    auth: state.auth,
    sauce: state.sauces.sauce
  }
}
export default connect(mapToState, {modifySauce})(withRouter(ModifySauce)) ;