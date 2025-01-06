import axios from "axios";
import { Scrap } from "../api";

export const scrapListSearchApi = async (injectedValue, cPage) => {
  const param = new URLSearchParams({
    ...injectedValue,
    currentPage: cPage,
    pageSize: 5,
  });
  const result = await axios.post(Scrap.SearchScrapList, param);

  return result.data;
};
