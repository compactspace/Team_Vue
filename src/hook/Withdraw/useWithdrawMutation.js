import { useMutation } from "@tanstack/vue-query";
import { WithdrawApi } from "../../api/Withdraw/WithdrawApi";

export const useWithdrawMutation=(confirmData)=>{

return(

    useMutation({
        mutationKey:['withDrawConfrim'],
        mutationFn:()=>WithdrawApi(confirmData),

    })
)

}