import axios from "axios";

import { Withdraw } from "../api";

export const  WithdrawApi=async (confirmData)=>{

    console.log(confirmData.value.password)

    if(confirmData.value.password===''||null||undefined){
        alert("탈퇴를 위해 비밀번호 입력이 필요합니다.");
        return
    }


let bodyData={
    loginId:confirmData.value.loginId,
    password:confirmData.value.password
 }

 console.log(bodyData)


   let result= await axios.post(Withdraw.WithdrawConfirm,bodyData);

   return result.data;

}
