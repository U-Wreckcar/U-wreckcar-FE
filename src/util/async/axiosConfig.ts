import axios from 'axios';
import { getCookie } from './Cookie';

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${getCookie('access_token')}`,
    'X-Refresh-Token': `Bearer ${getCookie('refresh_token')}`,
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  },
});

export default instance;
