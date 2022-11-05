import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://deploycreateursauce-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

