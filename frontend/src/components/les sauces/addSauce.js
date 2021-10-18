import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
// import { addSauce } from '../../reducer/actions';
import { withRouter } from 'react-router-dom';
import { axiosInstance } from '../../axios';

class AddSauce extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      manufacturer : "",
      description: '',
      mainPepper: '',
      heat: 1,
      image: '',
      imageURI : null,
      error: {}
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.chooseFile = this.chooseFile.bind(this)

  };

  // function pour récupérer valeur des inputs
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  // function quand on click sur button pour affecter action au input type file 
  chooseFile = async (e) => {
    document.getElementById('image').click()
  };

  // function pour récupérer URI image pour preview, stocker cette information dans le state
  readURI= async (e) => {
    
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (event) {
        this.setState({imageURI : event.target.result})
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }

  }
  
  // function pour récupérer image upload
  loadFile = async(e) => {
    await this.setState({image: e.target.files[0]})
    // preview cette image
    this.readURI(e)

  };

  // function pour submit la formulaire
  handleSubmit = async (event) => {
    event.preventDefault();
    // envoyer Form les informations au server
    let data = new FormData();
    data.append('name', this.state.name);
    data.append('manufacturer', this.state.manufacturer);
    data.append('description', this.state.description);
    data.append('mainPepper', this.state.mainPepper);
    data.append('heat', parseInt(this.state.heat));
    data.append('image', this.state.image);
    data.append('userId', this.props.auth.user.userId)
    data.append('cloudinary_id', '')

    // envoyer au server avec le data
   
      await axiosInstance.post('/api/sauces', data)
      //recevoir la response
      .then(res => {
        console.log("res" , res);
        this.props.history.push('/')
      })
      .catch ( (err) => {
        console.log("err ");
        Swal.fire("Erreur. Veuillez vérifier si le nom de la sauce est déjà utilisé, puis retenter plus tard")
        this.props.history.push('/')
      } )

  };

  render(){ 

    return (
      <form className=" lg:w-3/4 mx-2 md:mx-auto my-5 bg-white p-2 rounded " 
      onSubmit= {(event) => this.handleSubmit(event)}
      method="post" encType="multipart/form-data" >
        <h3 className="text-yellow-500 mx-auto p-2 my-2 text-center font-semibold text-3xl ">Ajouter votre sauce </h3>

        {/* input name */}
        <div className="p-2 my-1 ">
          <label htmlFor="name" className="text-violetClair " >Name</label>
          <input className="mx-auto h-full w-full px-2 transition-all border-gray-500 border-2 rounded-sm bg-white focus:bg-gray-100 "
          id="name" type="text" required name="name"
          onChange={this.handleChange}
          />
          
        </div>

        {/* input manufacturer */}
        <div className="p-2 my-1 ">
          <label className="text-violetClair " htmlFor="manufacturer" >Manufacturer</label>
          <input className="mx-auto h-full w-full px-2 transition-all border-gray-500 border-2 rounded-sm bg-white focus:bg-gray-100 " id="manufacturer" type="text" required name="manufacturer"
          onChange={this.handleChange} />
        </div>

        {/* input description */}
        <div className="p-2 my-1 ">
          <label className="text-violetClair " htmlFor="description" >Description</label>
          <input className="mx-auto h-full w-full px-2 transition-all border-gray-500 border-2 rounded-sm bg-white focus:bg-gray-100 " id="description" type="text" required name="description"
          onChange={this.handleChange} />
        </div>

        {/* button add image */}
        <div className="p-2 my-1 flex flex-wrap ">
          {/* input + button */}
          <div className="mr-5 ">
            <input id="image" type="file" required accept=".jpg, .jpeg, .png" name="image" style={{display:'none'}}
            onChange= { (e) => this.loadFile(e)}  />
            <button className="text-white p-2 rounded ring-2 my-2 bg-redPiquant text-center hover:opacity-80 focus:opcity-80 hover:shadow focus:shadow " onClick= {this.chooseFile}>
              ADD FILE
            </button>
          </div>
          {/* image preview */}
          <div className="">
            {this.state.imageURI ? (<img className="w-28 p-2 border border-gray-200 rounded  object-contain " src={this.state.imageURI} alt = {this.state.name} />) : (<div style= {{display:'none'}}></div>) }
            
          </div>
         
        </div>
        
        {/* input ingredient */}
        <div className="p-2 my-1 ">
          <label className="text-violetClair " htmlFor="ingredient" >Main Peppers Ingrédients</label>
          <input className="mx-auto h-full w-full px-2 transition-all border-gray-500 border-2 rounded-sm bg-white focus:bg-gray-100 " id="ingredient" type="text" required name="mainPepper"
          onChange= {this.handleChange} />
        </div>

        {/* bar progression pour Heat */}
        <div className="flex flex-col mx-auto px-5 py-2 my-1 ">
          <label htmlFor="heat" className="text-violetClair ">HEAT</label>
          <div className="flex flex-col-reverse md:flex-row justify-between ">
            <input type="range" className="mr-2 my-1 md:w-3/4 " min="1" max="10" id="heat" name="heat"  value = {this.state.heat} 
            onChange = {this.handleChange} />
            <input type="number" min="1" max="10" className="w-16 rounded text-center text-base border border-black border-4 px-2 py-1 my-2 focus:bg-gray-200 focus:opacity-80 " name="heat"  value = {this.state.heat}
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

function mapToState(state) {
  return {
    sauces: state.sauces,
    auth: state.auth
  }
};

export default connect(mapToState)(withRouter(AddSauce)) ;