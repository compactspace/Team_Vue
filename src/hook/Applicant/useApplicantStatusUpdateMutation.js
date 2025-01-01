import { ApplicantStatusUpdateApi } from "../../api/Appicant/ApplicantStatusUpdateApi";
import { useMutation } from "@tanstack/vue-query";

export const useApplicantStatusUpdateMutation=()=>{


    return(useMutation(
        {
mutationKey:["statusUpdate"],
mutationFn:()=>ApplicantStatusUpdateApi()
            
        }
    ))

}