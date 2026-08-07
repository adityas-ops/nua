import axios from 'axios';
import { BaseUrl } from '../constants/baseUrl';

const axiosInstance = axios.create({
  baseURL: BaseUrl,
  timeout: 10000,
});

export default axiosInstance;
