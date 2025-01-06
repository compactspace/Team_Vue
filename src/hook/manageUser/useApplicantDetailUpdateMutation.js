import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { applicantDetailUpdateApi } from "../../api/manageUser/applicantDetailUpdateApi";

export const useApplicantDetailUpdateMutation = (
  detailValue,
  loginId,
  modalState
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["applicantUpdate"],
    mutationFn: () => {
      applicantDetailUpdateApi(detailValue, loginId);
    },
    onSuccess: () => {
      alert("수정이 완료되었습니다.");
      modalState.setModalState();
      queryClient.invalidateQueries({
        queryKey: ["applicantList"],
      });
    },
  });
};
