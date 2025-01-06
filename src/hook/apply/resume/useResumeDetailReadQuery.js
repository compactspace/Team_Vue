import { useQuery } from "@tanstack/vue-query";
import { resumeDetailReadApi } from "../../../api/apply/resume/resumeDetailReadApi";

export const useResumeDetailReadQuery = (resIdx, resume, isEditor) => {
  return useQuery({
    queryKey: ["resumeDetail"],
    queryFn: () => resumeDetailReadApi(resIdx, resume, isEditor), // resIdx가 입력된 경우만 작동
    refetchInterval: 0, // 일정시간지남에따른 자동새로고침 비활성화
    refetchOnWindowFocus: false, // 창 포커스 시에도 자동새로고침 비활성화 but 코드작업시 따른 재활성은 막을 수 없음
  });
};
