import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: /*'https://createur-sauce.herokuapp.com'*/ 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

