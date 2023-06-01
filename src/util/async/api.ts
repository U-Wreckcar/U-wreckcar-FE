"use client";
import { AxiosResponse } from "axios";
import { removeCookie } from "./Cookie";
import axios from "./intercepter";
import { MainTableType } from "@/src/components/mainPage/TableData";
/** Init Get */

export const myProfile = async (refresh_token: string) => {
  try {
    // const instance = createAxiosInstance(access_token, refresh_token);
    const res = await axios.get(`users`, {
      headers: {
        "Content-Type": "application/json",
        "X-Refresh-Token": `Bearer ${refresh_token}`,
        // "Cache-Control": "no-store",
        // Expires: "0",
      },
    });
    return res;
  } catch (e) {
    console.log("Get Profile Error");
  }
};

/** GET */

export const getUTMs = async () => {
  try {
    const res: any = await axios.get("utms");
    return res;
  } catch (err: any) {
    console.log("err", err);
    // removeCookie("refresh_token");
    // removeCookie("access_token");
    return err;
  }
};

type DataType = { data: string[] };

export const getUTMExcell = async (data: DataType) => {
  try {
    await axios.post("utms/export/excell", data);
  } catch (e) {
    console.log(e);
  }
};
export const testExcell = async (data: DataType) => {
  try {
    await axios.post("utms/excel", { data });
  } catch (e) {
    console.log(e);
  }
};

export const getUTMSheet = async (data: DataType) => {
  try {
    await axios.post(`utms/export/sheet/csv`, data);
  } catch (e) {
    console.log(e);
  }
};
export const testUTMSheet = async (data: DataType) => {
  try {
    await axios.post("utms/csv", { data });
  } catch (e) {
    console.log(e);
  }
};

/**
 * POST
 */

// Login
type LoginData = {
  data: {
    email: string;
    password: string;
  };
};

export const localLogin = async (data: LoginData) => {
  try {
    const res = await axios.post("users/login", data);
    return res;
  } catch (e) {
    console.log("로그인 실패");
  }
};
export const postUTMs = async (data: any) => {
  try {
    const res = await axios.post("utms", data);
    return res;
  } catch (e) {
    console.log("Post UTM Error:", e);
  }
};

export const ExternalUTM = async (data: any) => {
  try {
    await axios.post("utms/external", data);
  } catch (e) {
    console.log(e);
  }
};

/** DELETE */

export const deleteUTM = async (data: any) => {
  try {
    await axios.post(`utms/delete`, data);
  } catch (e) {
    console.log(e);
  }
};

/** PATCH */

type EditMemoType = {
  _id: string | undefined;
  memo?: string;
};

export const patchUTM = async (data: EditMemoType) => {
  try {
    await axios.patch("utms/memo", data);
  } catch (e) {
    console.log(e);
  }
};

/** SIGNUP */

type VerifyEmail = {
  data: {
    email: string;
  };
};
type VerifyEmailNumType = {
  data: {
    email: string;
    verificationCode: string;
  };
};

type SignUp = {
  data: {
    email: string;
    username: string;
    password: string;
    company_name: string;
    marketing_accept: boolean;
  };
};

export const signUp = async (data: any) => {
  try {
    const res = await axios.post("users/signup", data);
    return res;
  } catch (err) {
    console.log(err);
    alert("회원가입에 실패하셨습니다.");
  }
};

export const confirmEmail = async (data: any) => {
  try {
    const res = await axios.post("users/email", data);
    return res;
  } catch (e) {
    console.log("email 중복확인 실패");
  }
};

export const verifyEmailNum = async (data: any) => {
  try {
    const res = await axios.post("users/emailverify", data);
    return res;
  } catch (e) {
    console.log("인증요청 실패");
  }
};

export const removeUser = async (data: any) => {
  try {
    await axios.post("users/userWithdrawal", data);
  } catch (e) {
    console.log(e);
  }
};

export const findEmail = async (data: any) => {
  try {
    const res = await axios.post("users/passwordverify", data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const newPW = async (data: any) => {
  try {
    const res = await axios.post("users/setnewpassword", data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

/** File Upload */

export const upload = async (data: any) => {
  try {
    const res = await axios.post("utms/importdata", data);
    return res;
  } catch (e) {
    console.log(e);
  }
};
