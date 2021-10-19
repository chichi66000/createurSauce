import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://createur-sauce.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

