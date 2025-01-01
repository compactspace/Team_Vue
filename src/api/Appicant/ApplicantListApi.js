import axios from "axios";
import { Applicant } from "../api";

export const ApplicantListApi = async (loginId,statusMesaage)=>{

    console.log(`loginId:  ${loginId}  statusMesaage:${statusMesaage}`)
    
    let res1= await axios.post(Applicant.ApplicantManagerGetId,{loginId:loginId});
    
    console.log(res1.data.MDetail[0].postIdx)
    
    let postIdx =res1.data.MDetail[0].postIdx
    
    let bodyData={
     postIdx:postIdx.toString(),
     loginId:loginId,
     firstProc:"",
     currentPage:"1" ,
     pageSize:"5",
     keyword:"서류심사중",
    }


 let res2= await axios.post(Applicant.ApllicantList, bodyData);

return res2.data;
}
