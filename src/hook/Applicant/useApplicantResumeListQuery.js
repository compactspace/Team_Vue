import { ApplicantResumeListApi } from "../../api/Appicant/ApplicantResumeListApi";
import { useQuery } from "@tanstack/vue-query";

export const useApplicantResumeListQuery=(resIdx)=>{

    return (
        useQuery({
            queryKey:['resumeFullList'],
            queryFn:()=>ApplicantResumeListApi (resIdx)
        })

    )



}

