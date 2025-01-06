import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { applicantPwResetApi } from "../../api/manageUser/applicantPwResetApi";

export const useApplicantPwResetMutation = (loginId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["ApplicantDetailPwReset"],
    mutationFn: () => applicantPwResetApi(loginId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ApplicantDetailPwReset"],
      });
    },
  });
};
