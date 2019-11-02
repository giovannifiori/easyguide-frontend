import axios from 'axios';
import { BASE_API_URL } from '../config/constants';

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000
});

export default api;
