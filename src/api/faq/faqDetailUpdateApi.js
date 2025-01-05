import axios from "axios";
import { Faq } from "../api";

export const faqDetailUpdateApi = async (detailValue, faq_idx) => {
  // textData 객체 생성
  const textData = {
    ...detailValue,
    faqSeq: faq_idx,
    context: detailValue.content, 
    faq_type: detailValue.faq_type, 
  };

  const formData = new FormData();
  
  // JSON 객체를 Blob 형태로 변환 후 FormData에 추가
  formData.append(
    "text",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    })
  );

  try {
    // API 호출
    const response = await axios.post(Faq.UpdateFaqDetail, formData);
    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("FAQ 수정 오류:", error); // 오류 출력
    throw error; // 오류를 상위로 전달
  }
};
