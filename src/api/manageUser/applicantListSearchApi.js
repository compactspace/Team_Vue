import axios from "axios";
import { Applicant } from "../api";

export const applicantListSearchApi = async (injectedValue, cPage) => {
  const requestBody = {
    ...injectedValue,
    currentPage: cPage,
    pageSize: 5,
  };

  const result = await axios.post(Applicant.SearchApplicantList, requestBody);

  return result.data;
};
