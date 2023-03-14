import axios from './axiosConfig';
import instance from "./axiosConfig";




/**
 *
 * Mock Data
 *
 */

export const getUTMs = axios.get('utms');

export const postUTMs = async (data: any) => {
  console.log(data);
  await axios.post('utms/create', data);
};

/**
 *
 * Server
 *
 * * GET
 */

// export const getUTMs = axios.get('utms');

export const getUTMExcell = async () => {
  await axios.get('utms/excell');
};
export const getUTMPDF = async () => {
  await axios.get('utms/pdf');
};
export const getUTMNotion = async () => {
  await axios.get('utms/csv');
};
// export const myProfile = async() =>{
//     await axios.get()
// }

/**
 * * POST
 */

// export const postFilterUTM = async () => {
//     await axios.post('utms', { params: { q: query } });
// };

//  export const postCreateUTMs = async (data) => {
//     await axios.post('utms', data);
//   };

/**
 * @param data {utm_url: string, memo:string}
 */
export const ExternalUTM = async (data: string) => {
  await axios.post('utm/add', data);
};

/**
 * * DELETE
 */

export const deleteUTM = async (utmId: any) => {
  await axios.delete(`utms/delete/${utmId}`);
};

