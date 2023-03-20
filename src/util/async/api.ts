import axios from "./axiosConfig";

/**
 *
 * Mock Data
 *
 */

export const getUTMs = async () => {
  const res = await axios.get("utms");
  return res;
};

export const postUTMs = async (data: any) => {
  const res = await axios.post("utms", data);
  return res;
};

/**
 *
 * Server
 *
 * * GET
 */

// export const getUTMs = axios.get('utms');
type DataType = { data: string[] };

export const getUTMExcell = async (data: DataType) => {
  await axios.post("utms/excell", data);
};
export const getUTMPDF = async () => {
  await axios.post("utms/pdf");
};
export const getUTMNotion = async () => {
  await axios.post("utms/csv");
};
export const myProfile = async () => {
  const res = await axios.get("users/profile");
  return res;
};

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
export const ExternalUTM = async (data: any) => {
  await axios.post("utms/external", data);
};

/**
 * * DELETE
 */

export const deleteUTM = async (data: any) => {
  await axios.post(`utms/delete`,data);
};

/**
 * * PATCH
 */

export const patchUTM = async (data:any) => {
  await axios.patch("utms/memo",data)
}