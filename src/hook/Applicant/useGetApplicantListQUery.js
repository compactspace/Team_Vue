import { getApplicantListApi } from "../../api/Appicant/getApplicantListApi";
import { useQuery } from "@tanstack/vue-query";

export const useGetApplicantListQUery = (
  loginId,
  hireProcessArr,
  postIdx,
  pageSetting,
  choiceStatus,
  injectedValue
) => {
  return useQuery({
    queryKey: ["applicantList"],
    queryFn: () =>
      getApplicantListApi(
        loginId,
        hireProcessArr,
        postIdx,
        pageSetting,
        choiceStatus,
        injectedValue
      ),

    // enabled: postIdx.value !== null // postIdx가 null이 아니면 쿼리가 실행됩니다.
  });
};
