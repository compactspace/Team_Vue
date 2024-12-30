import { useQuery } from "@tanstack/vue-query";
import { resumeDetailReadApi } from "../../../api/apply/resume/resumeDetailReadApi";

export const useResumeDetailReadQuery = (resIdx, resume, isEditable) => {
  return useQuery({
    refetchInterval: 0, // 일정시간지남에따른 자동새로고침 비활성화
    refetchOnWindowFocus: false, // 창 포커스 시에도 자동새로고침 비활성화 but 코드작업시 따른 재활성은 막을 수 없음
    queryKey: ["resumeDetail"],
    queryFn: () => resumeDetailReadApi(resIdx, resume, isEditable), // resIdx가 입력된 경우만 작동
  });
};
