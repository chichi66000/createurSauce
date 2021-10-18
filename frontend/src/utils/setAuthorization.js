
import { axiosInstance } from "../axios";

// s'il y a token dans localstorage, envoyer les appels API avec axios headers Authorisation avec ce token
export default function setAuthorization (token ) {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  // s'il n'y a pas de token, effacer headers de axios
  else {
    delete axiosInstance.defaults.headers.common['Authorization']
  }
}