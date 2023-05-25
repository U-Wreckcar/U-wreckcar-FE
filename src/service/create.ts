import axios from "../util/async/intercepter";
import { UTMsType } from "../components/createPage/CreateUTM";
export const createUTMs = async (data: UTMsType) => {
  try {
    const res = await axios.post("utms", data);
    return res;
  } catch (e) {
    console.log("Create UTM Fail:", e);
  }
};
