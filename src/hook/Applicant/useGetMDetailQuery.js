import { useQuery } from "@tanstack/vue-query";
import { getMDetailApi } from "../../api/Appicant/getMDetailApi";
export const useGetMDetailQuery =(postIdx,MDetail)=>{


return (
    useQuery({
        queryKey: ["infoMDetail"],
        queryFn: () => getMDetailApi(postIdx,MDetail),
        
      })
)


}