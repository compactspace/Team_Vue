import { toast } from "@/common/toastMessage";
import { useModalStore } from "@/stores/modalState";
import axios from "axios";
import { Login } from "../api";

export const findPwdUpdateApi = async (findPwdUserInfo) => {
  const result = await axios.post(Login.FindPwdUpdate, findPwdUserInfo.value);
  const modalStore = useModalStore();

  if (result.data.result === "SUCCESS") {
    toast.success("비밀번호를 바꿨습니다.");
    modalStore.setModalState();
  } else {
    toast.error("오류가 났습니다.");
  }

  return result.data;
};
