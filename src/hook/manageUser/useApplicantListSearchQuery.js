import { useQuery } from "@tanstack/vue-query";
import { applicantListSearchApi } from "../../api/manageUser/applicantListSearchApi";

export const useApplicantListSearchQuery = (injectedValue, cPage) => {
  return useQuery({
    queryKey: ["applicantList", injectedValue, cPage],
    queryFn: () => applicantListSearchApi(injectedValue.value, cPage.value),
  });
};
