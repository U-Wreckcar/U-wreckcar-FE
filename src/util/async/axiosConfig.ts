import axios from 'axios';
import { getCookie } from './Cookie';

const refresh_token = getCookie("refresh_token")
const access_token = getCookie("access_token")

const instance = axios.create({
  withCredentials:true,
  baseURL: process.env.NEXT_PUBLIC_DATA,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    // "access_token": `Bearer ${access_token}`,
    // "refresh_token":`Bearer ${refresh_token}`
  },
  // headers: { 'X-Custom-Header': 'foobar' },
});

export default instance;
