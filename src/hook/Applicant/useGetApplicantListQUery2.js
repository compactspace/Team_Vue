import { getApplicantListApi2 } from "../../api/Appicant/getApplicantListApi2";
import { useQuery } from "@tanstack/vue-query";

export const useGetApplicantListQUery2 =(postIdx,pageSetting,choiceStatus,injectedValue)=>{

return(
    useQuery({
        queryKey:["applicantList"],
        queryFn:()=>getApplicantListApi2(postIdx,pageSetting,choiceStatus,injectedValue),
        enabled: false
    })
)


}