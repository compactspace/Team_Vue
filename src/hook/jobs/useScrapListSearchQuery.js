import { useQuery } from "@tanstack/vue-query";
import { scrapListSearchApi } from "../../api/jobs/scrapListSearchApi";

export const useScrapListSearchQuery = (injectedValue, cPage) => {
  return useQuery({
    queryKey: ["scrapList", injectedValue, cPage], // key에 넣으면 watch와 같은 효과
    queryFn: () => scrapListSearchApi(injectedValue.value, cPage.value),
    staleTime: 1000 * 60,
  });
};
