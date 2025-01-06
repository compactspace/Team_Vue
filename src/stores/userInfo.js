import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserInfo = defineStore(
  "userInfo",
  () => {
    const user = ref();
    async function setUserData(loginInfo) {
      const param = new URLSearchParams(loginInfo);
      const resultPlain = await axios.post("/prx/loginProc.do", param); // 평문
      const resultBcrypt = await axios.post("/prx/api/loginProc.do", param); // 암호
      user.value =
        resultPlain.data.result === "SUCCESS"
          ? resultPlain.data
          : resultBcrypt.data;
      return user.value.result;
    }

    return { user, setUserData };
  },
  { persist: { storage: sessionStorage } }
);
