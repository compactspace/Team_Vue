import { ApplicantListApi } from "../../api/Appicant/ApplicantListApi";
import { useQuery } from "@tanstack/vue-query";
<<<<<<< HEAD

export const useApplicantListQuery= (loginId,statusMesaage)=>{
=======
export const useApplicantListQuery= (loginId,statusMesaage, postIdx)=>{
>>>>>>> feat/#51


    return(
        useQuery({
            queryKey:["applicantList"],
<<<<<<< HEAD
            queryFn:()=>ApplicantListApi(loginId,statusMesaage)
=======
            queryFn:()=>ApplicantListApi(loginId,statusMesaage, postIdx),
            // enabled: false,
            
>>>>>>> feat/#51
        })
    )


}