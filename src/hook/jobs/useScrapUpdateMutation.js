import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { scrapUpdateApi } from "../../api/jobs/scrapUpdateApi";

export const useScrapUpdateMutation = (postIdx) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["scrapUpdate"],
    mutationFn: () => scrapUpdateApi(postIdx),
    onSuccess: () => {
      alert("스크랩 완료 alert");
      queryClient.invalidateQueries({
        queryKey: ["postList"],
      });
    },
  });
};
