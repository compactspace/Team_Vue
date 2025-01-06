import axios from "axios";
import { useUserInfo } from "../../../stores/userInfo";
import { History } from "../../api";

export const historyListReadApi = async (
  itemPerPage,
  currentPage,
  injectedHistorySearchValue
) => {
  const userInfo = useUserInfo();

  const param = {
    ...injectedHistorySearchValue.value,
    loginId: userInfo.user.loginId,
    userNm: userInfo.user.userNm,
    userType: userInfo.user.userType,
    currentPage: currentPage.value.toString(),
    pageSize: itemPerPage.value.toString(),
  };

  const result = await axios.post(History.ReadHistoryList, param);
  return result.data;
};
