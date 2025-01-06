import { useQuery } from "@tanstack/vue-query";
import { getApplicantPaginApi } from "../../api/Appicant/getApplicantPaginApi";

export const useApplicantPaginQuery=(injectedValue,cPage)=>{

    return(useQuery({
        queryKey:['paginList',cPage],
        queryFn:()=>getApplicantPaginApi(injectedValue,cPage),
        enabled:false

    }))

}