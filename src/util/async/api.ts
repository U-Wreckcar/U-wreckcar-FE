import axios from "./axiosConfig"

/**
 *
 * Server
 *
 * * POST
 */


export const postUTMs = async (data: any) => {
  const res = await axios.post("utms", data)
  return res
}

/**
 *
 * Server
 *
 * * GET
 */

 export const getUTMs = async () => {
  const res = await axios.get("utms")
  return res
}

// export const getUTMs = axios.get('utms');
type DataType = { data: string[] }

export const getUTMExcell = async (data: any) => {
  await axios.post("utms/export/excell", data)
}
export const testExcell = async (data: any) => {
  await axios.post("utms/toxlsx", { data })
}
export const getUTMNotion = async (data: any) => {
  await axios.post("utms/export/pdf", data)
}
export const getUTMSheet = async (data: any) => {
  await axios.get(`utms/export/sheet`, data)
}
export const testUTMSheet = async (data: any) => {
  await axios.post("utms/tocsv", { data })
}
export const myProfile = async () => {
  const res = await axios.get("users/profile")
  return res
}

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
  await axios.post("utms/external", data)
}

/**
 * * DELETE
 */

export const deleteUTM = async (data: any) => {
  await axios.post(`utms/delete`, data)
}

/**
 * * PATCH
 */

export const patchUTM = async (data: any) => {
  await axios.patch("utms/memo", data)
}

/**
 * * SIGNUP
 */

export const signUp = async (data:any) => {
  try{
   const res = await axios.post("users/signup", data)
    return res
  }catch(err){
    console.log(err)
    alert("회원가입에 실패하셨습니다.")
  }
}

export const confirmEmail =async (data:any) => {
  const res = await axios.post("users/email", data)
  return res
}

/**
 * * Login
 */

export const localLogin = async (data:any) => {
  const res = await axios.post("users/login", data)
  return res
}