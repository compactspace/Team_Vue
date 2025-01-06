import axios from "axios";
import { useUserInfo } from "../../../stores/userInfo";
import { Resume } from "../../api";

export const resumeListReadApi = async (itemPerPage, currentPage) => {
  const userInfo = useUserInfo();

  const param = {
    loginId: userInfo.user.loginId,
    userNm: userInfo.user.userNm,
    userType: userInfo.user.userType,
    currentPage: currentPage.value,
    pageSize: itemPerPage.value,
  };

  const result = await axios.post(Resume.ReadResumeList, param);
  return result.data;
};
