<<<<<<< HEAD
import { ApplicantStatusUpdateApi } from "../../api/Appicant/ApplicantStatusUpdateApi";
import { useMutation } from "@tanstack/vue-query";

export const useApplicantStatusUpdateMutation=()=>{
=======

import { ApplicantStatusUpdateApi } from "../../api/Appicant/ApplicantStatusUpdateApi";
import { useMutation } from "@tanstack/vue-query";

export const useApplicantStatusUpdateMutation=(choiceStatus)=>{
>>>>>>> feat/#51


    return(useMutation(
        {
mutationKey:["statusUpdate"],
<<<<<<< HEAD
mutationFn:()=>ApplicantStatusUpdateApi()
=======
mutationFn:()=>ApplicantStatusUpdateApi(choiceStatus)
>>>>>>> feat/#51
            
        }
    ))

<<<<<<< HEAD
}
=======
}
>>>>>>> feat/#51
