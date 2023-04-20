import axios, { AxiosInstance } from 'axios';

const createAxiosInstance = (
  access_token: string,
  refresh_token: string
): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      'X-Refresh-Token': `Bearer ${refresh_token}`,
      'Cache-Control': 'no-store',
      Expires: '0',
    },
  });
  return instance;
};

export default createAxiosInstance;
