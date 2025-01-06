import { useQuery } from "@tanstack/vue-query";
import { postDetailSearchApi } from "../../api/jobs/postDetailSearchApi";

export const usePostDetailSearchQuery = (params) => {
  return useQuery({
    queryKey: ["postDetail"],
    queryFn: () => postDetailSearchApi(params),
    enabled: !!params.idx, // !!(undefine) => false
  });
};
