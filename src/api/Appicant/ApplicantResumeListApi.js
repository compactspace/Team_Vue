import { Applicant } from "../api";

import axios from "axios";

export const ApplicantResumeListApi = async (resIdx) => {
  let res1;
  let res2;
  let res3;
  let res4;


let newObject=new Object();
  try {
    let bodyData = {
      resIdx: resIdx,
    };


    res1 = await axios.post(Applicant.ApplicantResumeIndependent, bodyData);
    res2 = await axios.post(Applicant.ApplicantcareerListIndependent, bodyData);
    res3 = await axios.post(Applicant.ApplicantEducationListtIndependent, bodyData);
    res4 = await axios.post(Applicant.ApplicantskillListIndependent, bodyData);
    
    newObject.resume=res1.data.payload;
    newObject.career=res2.data.payload;
    newObject.educattion=res3.data.payload;
    newObject.skill=res4.data.payload;
    
    console.log(res1.data.payload);
    console.log(res2.data.payload[0]);
    console.log(res3.data.payload[0]);
    console.log(res4.data.payload[0]);


  } catch (err) {
    //데이터는 모두 한번에 정확히 와야한다. 실패하면 리패치 함수를 추가한다.
    console.log(err);
  }

console.log(newObject)

return newObject;


}