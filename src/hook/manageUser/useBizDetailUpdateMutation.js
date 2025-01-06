import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { bizDetailUpdateApi } from "../../api/manageUser/bizDetailUpdateApi";

export const useBizDetailUpdateMutation = (detailValue, bizIdx, modalState) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["bizUpdate"],
    mutationFn: () => {
      bizDetailUpdateApi(detailValue, bizIdx);
    },
    onSuccess: () => {
      alert("수정이 완료되었습니다.");
      modalState.setModalState();
      queryClient.invalidateQueries({
        queryKey: ["bizList"],
      });
    },
  });
};
