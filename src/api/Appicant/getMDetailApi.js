import axios from "axios";
import { Applicant } from "../api";

export const getMDetailApi = async (postIdx, MDetail, choiceStatus, provideMDVal) => {
  let res = await axios.post(Applicant.ApplicantManagerGetId);

  MDetail.value.Md = [...res.data.MDetail];

  // postIdx.value = res.data.MDetail[0].postIdx;

  let hirProcessArr = new Array();
  let temporayryArr = new Object();
  let i = 0;
  res.data.MDetail.forEach((item) => {
    let { hirProcess, postIdx, title } = item;

    console.log(`엠디테일에서 postIdx ${postIdx}  그리고 title  ${title}`);
    // temporayryArr[i] = hirProcess.split(" → ").map((item) => item.trim());
    temporayryArr[postIdx] = hirProcess.split(" → ").map((item) => item.trim());
    i++;
  });

  console.log(temporayryArr);

  let { hirProcess } = res.data.MDetail[0];

  //   console.log(hirProcess[0].split(" → "));
  hirProcessArr = [...hirProcess.split(" → ").map((item) => item.trim())];

  //   console.log(hirProcessArr[0]);

  choiceStatus.value = hirProcessArr[0];
  //   console.log(choiceStatus.value);
  hirProcessArr.push("합격");
  hirProcessArr.push("탈락");

  MDetail.value.hirProcess = [...hirProcessArr];
  MDetail.value.hireProcessArr = { ...temporayryArr };

  provideMDVal.value = hirProcessArr;

  postIdx.value = res.data.MDetail[0].postIdx;
  console.log(`postIdx.value:  ${postIdx.value} `);

  return res.data.MDetail;
};
