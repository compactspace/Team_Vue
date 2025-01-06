import axios from "axios";
import { Applicant } from "../api";

export const applcantDetailSearchApi = async (params) => {
  const result = await axios.post(Applicant.SearchApplicantDetail, {
    loginId: params.loginId,
  });
  return result.data;
};
