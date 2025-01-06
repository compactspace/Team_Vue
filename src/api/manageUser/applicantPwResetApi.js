import axios from "axios";
import { Applicant } from "../api";

export const applicantPwResetApi = async (loginId) => {
  if (confirm("정말 초기화하시겠습니까?")) {
    await axios.post(Applicant.ResetApplicantPw, { loginId }).then((res) => {
      alert("비밀번호가 1234 로 초기화되었습니다.");
    });
  } else {
    return false;
  }
};
