import axios from "./axiosConfig"
import { removeCookie } from "./Cookie"

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
  try{
    const res = await axios.get("utms", { cache: false })
    return res
  }catch(err){
    console.log("err", err)
    removeCookie("refresh_token")
    removeCookie("access_token")
    return err
  }
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
  await axios.post(`utms/export/sheet/csv`, data)
  // await axios.get(`utms/export/sheet/csv`)
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

type EditMemoType = {
  utm_id : string,
  utm_memo : string,
}

export const patchUTM = async (data: EditMemoType) => {
  await axios.patch("utms/memo", data)
}

/**
 * * SIGNUP
 */
 type VerifyEmail = {
  data:{
    email:string
  }
}
type VerifyEmailNumType = {
  data:{
    email:string
    verificationCode:string
  }
}

type RemoveUserType = {
  data:{
    reason:string | ""
  }
}

type SignUp = {
  data:{
    email: string
    username : string
    password : string
    company_name : string,
    marketing_accept : boolean
  }
}


export const signUp = async (data: SignUp) => {
  try {
    const res = await axios.post("users/signup", data)
    return res
  } catch (err) {
    console.log(err)
    alert("회원가입에 실패하셨습니다.")
  }
}

export const confirmEmail = async (data:VerifyEmail) => {
  const res = await axios.post("users/email", data)
  return res
}

export const verifyEmailNum = async (data: VerifyEmailNumType) => {
  const res = await axios.post("users/emailverify", data)
  return res
}

export const removeUser =async (data:RemoveUserType) => {
  await axios.post("users/userWithdrawal", data)
}

export const findEmail = async(data:VerifyEmail) => {
 const res =  await axios.post("users/passwordverify", data)
 return res
}

export const newPW = async (data:LoginData) => {
  const res = await axios.post("users/setnewpassword", data)  
  return res
}

/**
 * * Login
 */

type LoginData = {
  data:{
    email:string
    password:string
  } 
}

export const localLogin = async (data:LoginData) => {
  const res = await axios.post("users/login", data)
  return res
}

/**
 * * file-upload
 */
export const upload =async (data:any) => {
  const res = await axios.post("utms/importdata",data)
}

