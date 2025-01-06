import { useQuery } from "@tanstack/vue-query";
import { bizDetailSearchApi } from "../../api/manageUser/bizDetailSearchApi";

export const useBizDetailSearchQuery = (params) => {
  return useQuery({
    queryKey: ["bizDetail"],
    queryFn: () => bizDetailSearchApi(params),
    enabled: !!params.idx,
  });
};
