import { toast } from "@/common/toastMessage";
import axios from "axios";
import { Login } from "../api";

export const findIdApi = async (findIdUserInfo) => {
  const result = await axios.post(Login.FindId, findIdUserInfo.value);

  if (result.data.result === "SUCCESS") {
    toast.success("아이디를 찾았습니다.");
    findIdUserInfo.value.foundId = result.data.id;
  } else {
    toast.error("잘못 입력하였습니다.\n다시 입력해주세요.");
  }

  return result.data;
};
