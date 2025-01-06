import axios from "axios";

import { Applicant } from "../api";

// param keyword => 서류심사중 면접진행중 최총합격 서류탈락 면접탈락
// loginId =>말그대로 공고자 의 아이디

export const ApplicantStatusUpdateApi=async (choiceStatus)=>{

   
    let bodyData={
        keyword:choiceStatus.value.keyword,
        loginId:choiceStatus.value.loginId,
        postIdx:choiceStatus.value.postIdx

    }

console.log(bodyData)

let res=await axios.post(Applicant.ApplicantStatusUpdate,bodyData);

    return bodyData;


}
