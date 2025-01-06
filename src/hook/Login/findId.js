import { useMutation } from "@tanstack/vue-query";
import { findIdApi } from "../../api/login/findIdApi";

export const findId = (findIdUserInfo) => {
  return useMutation({
    mutationFn: () => findIdApi(findIdUserInfo),
  });
};
