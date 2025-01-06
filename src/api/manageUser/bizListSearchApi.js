import axios from "axios";
import { Biz } from "../api";

export const bizListSearchApi = async (injectedValue, cPage) => {
  const requestBody = {
    ...injectedValue,
    currentPage: cPage,
    pageSize: 5,
  };

  const result = await axios.post(Biz.SearchBizList, requestBody);
  return result.data;
};
