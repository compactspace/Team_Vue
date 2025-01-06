import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeDetailUpdateApi } from "../../../api/apply/resume/resumeDetailUpdateApi";

export const useResumeDetailUpdateMutation = (resIdx, resume, fileData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resumeUpdate"],
    mutationFn: () => resumeDetailUpdateApi(resIdx, resume, fileData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumeList"],
      });
    },
  });
};
