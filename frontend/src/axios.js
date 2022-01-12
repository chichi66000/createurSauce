import axios from 'axios';

export const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: /*'https://createur-sauce.herokuapp.com'*/ 'http://localhost:5000',
=======
  baseURL: 'https://createur-sauce.herokuapp.com',
>>>>>>> 2f9bdc88c9a41b2d167db25a3e32d22d66541838
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

