import axios from "axios";
import { Notice } from "../api";

export const qnaListSearchApi = async (cPage, injectedValue, type) => {
  //   console.log(`api cPage ${cPage.value}       type ${type.value}`);

  if (type.value == "M") {
    type.value = "B";
  }

  const param = {
    currentPage: cPage.value.toString(),
    pageSize: "5",
    startSeq: "0",
    qna_type: type.value, //injectedValue.value.Type,
    requestType: injectedValue.value?.requestType || "",
    searchTitle: injectedValue.value?.searchTitle || "",
    searchStDate: injectedValue.value?.searchStDate || "",
    searchEdDate: injectedValue.value?.searchEdDate || "",
  };

  const result = await axios.post(Notice.SearchQnaBoardList, param);

  //console.log(result);

  return result.data;
};
