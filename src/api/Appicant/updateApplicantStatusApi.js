import axios from "axios";

export const updateApplicantStatusApi= async (keyword,postIdx,loginId)=>{

let bodyData={
    keyword:keyword.value,
    postIdx:postIdx.value,
    loginId:loginId.value
}

console.log(bodyData)

let res= await axios.post('/prx/api/manage-hire/statusUpdate.do',bodyData)

console.log(res.data)

keyword.value=''
postIdx.value=''
loginId.value=''



}