import axios from "axios";
import { Applicant } from "../api";
import { toRaw } from "vue";
export const getApplicantListApi = async (
  loginId,
  hireProcessArr,
  postIdx,
  pageSetting,
  choiceStatus,
  injectedValue
) => {
  console.log(hireProcessArr.value);

  let first;

  //   for (let key in hireProcessArr.value) {
  //     console.log(`postIdx:  ${postIdx.value}   key  ${key}`);
  //     if (key == postIdx.value) {
  //       // console.log(toRaw(hireProcessArr.value)[key]);
  //       choiceStatus.value = { ...toRaw(hireProcessArr.value[key])[0] };
  //       console.log(choiceStatus.value);
  //     }
  //   }
  choiceStatus.value = hireProcessArr.value[0];
  let bodyData = {
    loginId: loginId,
    postIdx: postIdx.value.toString(),
    firstProc: choiceStatus.value,
    keyword: choiceStatus.value,
    currentPage: pageSetting.value.currentPage.toString(),
    pageSize: pageSetting.value.pageSize.toString(),
  };
  console.log(bodyData);
  let res = await axios.post(Applicant.ApllicantList, bodyData);

  console.log(res.data);

  injectedValue.value = {
    list: res.data.list,
    count: res.data.count,
  };

  return injectedValue;
  //return res.data.list
};
