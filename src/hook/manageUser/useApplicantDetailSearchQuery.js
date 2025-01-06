import { useQuery } from "@tanstack/vue-query";
import { applcantDetailSearchApi } from "../../api/manageUser/applcantDetailSearchApi";

export const useApplicantDetailSearchQuery = (params) => {
  return useQuery({
    queryKey: ["applicantDetail"],
    queryFn: () => applcantDetailSearchApi(params),
    enabled: !!params.loginId,
  });
};
