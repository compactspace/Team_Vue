import axios from "axios";

export const getApplicantListApi2= async (postIdx,pageSetting,choiceStatus,injectedValue)=>{

console.log(`postIdx:  ${postIdx.value}`)
console.log(injectedValue)
    let bodyData = {
      postIdx: postIdx.value.toString(),
      firstProc:"서류심사중",
      keyword: "서류심사중",
      currentPage: pageSetting.value.currentPage.toString(),
      pageSize: pageSetting.value.pageSize.toString(),
    };
    if(choiceStatus.value!='서류심사중'){
      bodyData.keyword=choiceStatus.value;
    }
   // console.log(pageSetting.value)
  
  
  
    console.log(bodyData)
    let res = await axios.post("/prx/api/manage-hire/applicantList.do", bodyData);
   console.log(res.data.list);
  
    // applicant.value = [...res.data.ApplicantList];
    injectedValue.value={
    list:res.data.list,
    count:res.data.count
    };

    console.log(injectedValue)
    return res.data.list


}