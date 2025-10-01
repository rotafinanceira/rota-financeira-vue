import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://rotafinanceira.onrender.com/api',
});
