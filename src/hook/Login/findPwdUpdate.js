import { useMutation } from "@tanstack/vue-query";
import { findPwdUpdateApi } from "../../api/login/findPwdUpdateApi";

export const findPwdUpdate = (findPwdUserInfo) => {
  return useMutation({
    mutationFn: () => findPwdUpdateApi(findPwdUserInfo),
  });
};
