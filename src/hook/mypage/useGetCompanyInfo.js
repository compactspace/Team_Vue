import { useMutation } from "@tanstack/vue-query";
import { getCompanyInfoApi } from "../../api/mypage/getCompanyInfoApi";

export const useGetCompanyInfo = (companySave, fileData) => {
  return useMutation({
    mutationKey: ["getCompanyInfo"],
    mutationFn: () => getCompanyInfoApi(companySave, fileData),
  });
};
