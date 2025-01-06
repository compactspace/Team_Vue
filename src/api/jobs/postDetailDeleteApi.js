import axios from "axios";
import { Post } from "../api";

export const postDetailDeleteApi = async (bizIdx, postIdx) => {
  await axios
    .post(Post.DeletePostDetail, { bizIdx: bizIdx, postIdx: postIdx })
    .then((res) => {
      if (res.data.result === "success") {
        alert("삭제되었습니다.");
        // router.go(-1);
      }
    });
};
