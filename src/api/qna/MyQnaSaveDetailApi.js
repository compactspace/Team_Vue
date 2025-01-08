import { Notice } from "../api";
import axios from "axios";

export const MyQnaSaveDetailApi = async (formData) => {
  // console.log(formData)

  let bodyData = formData.value;

  await axios.post(Notice.InsertMyQnaDetail, bodyData);
};
