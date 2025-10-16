import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://rotafinanceira-api-hml-latest.onrender.com/api',
});
