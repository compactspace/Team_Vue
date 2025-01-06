import axios from "axios";
import { Biz } from "../api";

export const bizDetailSearchApi = async (params) => {
  const searchDetail = async () => {
    await axios
      .post("/prx/api/manage-user/bizManageDetail.do", {
        bizIdx: props.idx,
      })
      .then((res) => {
        bizDetail.value = res.data.detail;
      });
  };
  const result = await axios.post(Biz.SearchBizDetail, { bizIdx: params.idx });
  return result.data;
};
