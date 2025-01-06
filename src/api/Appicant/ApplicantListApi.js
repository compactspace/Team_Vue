
import axios from "axios";
import { Applicant } from "../api";

export const ApplicantListApi = async (loginId,statusMesaage, postidx)=>{

    let newObj=new Object()
    console.log(`loginId:  ${loginId}  statusMesaage:${statusMesaage.value}   postIdx:${ postidx.value}`)
    
    let postIdx=postidx.value;
    if(postidx.value==null){
        let res1= await axios.post(Applicant.ApplicantManagerGetId,{loginId:loginId});   
        postIdx =res1.data.MDetail[0].postIdx
        newObj.MDetail=res1.data.MDetail;
    }  
    
    if(statusMesaage?.value && statusMesaage.value.indexOf("불합격")!=-1 ){
        statusMesaage.value="탈락";
    }
    
    let bodyData={
     postIdx:postIdx.toString(),
     loginId:loginId,
     firstProc:"",
     currentPage:"1" ,
     pageSize:"5",
     keyword:statusMesaage?.value||"서류심사중",
    }


console.log(bodyData)

 let res2= await axios.post(Applicant.ApllicantList, bodyData);
    
console.log(res2.data)

newObj.ApplicantList=res2.data;
return newObj;
//return res2.data;
}
