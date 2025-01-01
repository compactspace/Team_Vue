import { ApplicantListApi } from "../../api/Appicant/ApplicantListApi";
import { useQuery } from "@tanstack/vue-query";

export const useApplicantListQuery= (loginId,statusMesaage)=>{


    return(
        useQuery({
            queryKey:["applicantList"],
            queryFn:()=>ApplicantListApi(loginId,statusMesaage)
        })
    )


}