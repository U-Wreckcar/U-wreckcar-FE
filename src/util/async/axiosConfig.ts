import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DATA,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',

  },
  withCredentials: true,
});

export default instance;
