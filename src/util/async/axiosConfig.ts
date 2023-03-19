import axios from 'axios';
import { getCookie } from './Cookie';

const refresh_token = getCookie("refresh_token")
const access_token = getCookie("access_token")

const instance = axios.create({
  withCredentials:true,
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`,
    'X-Refresh-Token': `Bearer ${refresh_token}`,
  },

});

export default instance;
