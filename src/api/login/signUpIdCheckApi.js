import { toast } from "@/common/toastMessage";
import axios from "axios";
import { Login } from "../api";

export const signUpIdCheckApi = async (signUpUserInfo, isIdCheck) => {
  let data = { loginId: signUpUserInfo.value.loginId };
  const result = await axios.post(Login.SignUpIdCheck, data);

  const idCheckBtn = document.querySelector(".idCheckBtn");
  if (result.data.result === "success") {
    toast.error("중복된 ID입니다.");
    idCheckBtn.style.backgroundColor = "red";
    isIdCheck.value = false;
  } else {
    toast.success("사용 가능한 ID입니다.");
    idCheckBtn.style.backgroundColor = "green";
    isIdCheck.value = true;
  }
  document.body.style.idCheckBtn = idCheckBtn;

  return result.data.result;
};
