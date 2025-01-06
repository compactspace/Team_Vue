import axios from "axios";

export const getApplicantPaginApi= async (injectedValue,cPage)=>{
//console.log(injectedValue.value.list[0])
   
    let bodyData = {
      postIdx: injectedValue.value.list[0].postIdx.toString(),
      firstProc:"서류심사중",
      keyword: injectedValue.value.list[0].status.toString(),
      currentPage: cPage.value.toString(),
      pageSize: "5",
    };
 
    if(bodyData.keyword.indexOf("탈락")!=-1){
        bodyData.keyword="탈락";
    }
   // console.log(pageSetting.value)  
     //console.log(bodyData)
    let res = await axios.post("/prx/api/manage-hire/applicantList.do", bodyData);
    injectedValue.value={
        list:res.data.list,
        count:res.data.count
        };
      // injectedValue.list= res.data.ApplicantList
      // injectedValue.count= res.data.count
        console.log(injectedValue.value)
        return res.data.list
}