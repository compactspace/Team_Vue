import { useQuery } from "@tanstack/vue-query";
import { bizListSearchApi } from "../../api/manageUser/bizListSearchApi";

export const useBizListSearchQuery = (injectedValue, cPage) => {
  return useQuery({
    queryKey: ["bizList", injectedValue, cPage],
    queryFn: () => bizListSearchApi(injectedValue.value, cPage.value),
  });
};
