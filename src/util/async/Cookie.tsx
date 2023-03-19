import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string) => {
  return cookies.set(name, value);
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};
