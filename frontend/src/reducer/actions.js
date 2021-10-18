
import * as actions from './actionType';
import { axiosInstance }  from '../axios';
import setAuthorization  from '../utils/setAuthorization.js'
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';

// function ajouter user dans le state
export function add_current_user(user) {
  return {
    type: actions.ADD_CURRENT_USER,
    user
  };
}

//function login avec data depuis la response API du server
export function login(data) {
  return dispatch => {
    return axiosInstance.post('/api/auth/login', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorization(token);
      dispatch(add_current_user(jwt_decode(token)));
    });
  }
}

// function logout
export function logout () {
  return dispatch => {
    // enlever token dans le mémoire
    localStorage.removeItem('jwtToken');
    // reset user à null
    dispatch(add_current_user({}));
  }
  
}

// function ajouter les sauces dans le state
export function saveSauces (sauces) {
  return {
    type: actions.GETALLSAUCE,
    sauces
  };
}

// function ajouter sauce avec id dans le state
export function saveOneSauce (sauce) {
  return {
    type: actions.GETONESAUCE,
    sauce
  }
}
// function getAllSauce, API call
export function getAllSauce () {
  return dispatch => {
    return axiosInstance.get('/api/sauces')
      .then( res => {
        // recevoir response puis enregistrer dans le state
        dispatch(saveSauces(res.data))
        
      })
  }
}

// envoyer la sauce crée au server
export function addSauce (data) {
  return dispatch => {
    return axiosInstance.post('/api/sauces', data)
    //recevoir la response, enregistrer dans le state
    .then(res => {
      // dispatch(saveSauces(res.data))
      console.log(res);
    })
    .catch (err => {
      console.log(err);
      Swal.fire("Erreur. Veuillez changer le nom de sauce pui retenter plus tard ")
    } )
  }
}

// function getOneSauce 
export function getOneSauce(id) {
  return dispatch => {
    axiosInstance.get(`api/sauces/${id}`)
    .then( res => {
      dispatch(saveOneSauce(res.data)) 
    })
    .catch(err => console.log(err))
  }
  
}

// function liked la sauce
export function likeSauce (id, like, userId) {
  return dispatch => {
    console.log("userId from front ", userId);
    return axiosInstance.post(`/api/sauces/${id}/like`, {
      like: like,
      userId: userId
    })
    .then(res => { console.log(res);})
    .catch (err => {console.log(err);})
  }
}

// function disliked la sauce
export function dislikeSauce (id, like, userId) {
  return dispatch => {
    return axiosInstance.post(`/api/sauces/${id}/like`, {
      like: like,
      userId: userId
    })
    .then(res => { console.log(res);})
    .catch (err => {console.log(err);})
  }
}

// function deleteSauce
// export function deleteSauce (id) {
//   return dispatch => {
//     axiosInstance.delete(`/api/sauces/${id}`)
//     .then( res => {console.log(res);})
//     .catch (err => {console.log(err);})
//   }
// };

// funtion modifySauce
export function modifySauce(id, data) {
  return dispatch => {
    axiosInstance.put(`/api/sauces/${id}`, data)
    .then( res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);})
  }
}