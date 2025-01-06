import axios from "axios";
import { Post } from "../api";

export const postDetailSearchApi = async (params) => {
  const result = await axios.post(Post.SearchPostDetail, {
    postIdx: params.idx,
  });
  return result.data;
};
