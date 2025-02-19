<template>
  <div class="findPwdModal">
    <div class="findPwdModalContent">
      <div class="findPwdModalTitle">
        <h2>비밀번호 찾기</h2>
        <span>
          <img
            src="../../../../public/icon_close.png"
            class="closeModalBtn"
            @click="findUserPwdModalCloseBtn"
            alt="close"
          />
        </span>
      </div>
      <table>
        <tr>
          <td colspan="3">
            <hr />
          </td>
        </tr>

        <tr v-if="!findPwdCheck">
          <th>
            <label for="id">아이디</label>
          </th>
          <td colspan="3">
            <input
              type="text"
              id="id"
              v-model="findPwdUserInfo.id"
              placeholder="가입하신 아이디를 입력하세요."
            />
          </td>
        </tr>

        <tr v-if="!findPwdCheck">
          <th>
            <label for="email">이메일</label>
          </th>
          <td colspan="3">
            <input
              type="text"
              id="email"
              v-model="findPwdUserInfo.email"
              placeholder="가입하신 이메일을 입력하세요."
            />
          </td>
        </tr>

        <tr class="findIdTr" v-if="findPwdCheck">
          <th>
            <label for="pwd">새로운 비밀번호</label>
          </th>
          <td>
            <input
              type="password"
              id="pwd"
              v-model="findPwdUserInfo.pw"
              placeholder="비밀번호는 4~40자로 입력하세요."
            />
          </td>
        </tr>

        <tr class="findIdTr" v-if="findPwdCheck">
          <th>
            <label for="pwdCk">비밀번호 확인</label>
          </th>
          <td>
            <input
              type="password"
              id="pwdCk"
              v-model="findPwdUserInfo.pwCk"
              placeholder="비밀번호를 다시 입력하세요."
            />
          </td>
        </tr>
      </table>
      <button
        class="handlerFindPwdBtn"
        @click="findPwdCheck ? pwdValid() : findPwdVaild()"
      >
        확인
      </button>
    </div>
  </div>
</template>

<script setup>
import { handlerEnterKey } from "@/common/handler/handlerEnterKey";
import { toast } from "@/common/toastMessage";
import { useModalStore } from "@/stores/modalState";
import { ref } from "vue";
import { useFindPwd } from "../../../hook/Login/useFindPwd";
import { useFindPwdUpdate } from "../../../hook/Login/useFindPwdUpdate";

const modalStore = useModalStore();
const findPwdUserInfo = ref({
  id: "",
  email: "",
  pw: "",
  pwCk: "",
});
const findPwdCheck = ref(false);

// 1. 비밀번호 찾기 유효성 검사(입력 했는지 검사)
const findPwdVaild = () => {
  if (!findPwdUserInfo.value.id || !findPwdUserInfo.value.email) {
    toast.error("아이디와 이메일을 모두 입력해주세요.");
    return;
  } else {
    handlerFindPwd();
  }
};

// 2. 비밀번호 찾기 사용자 정보 확인
const { mutate: handlerFindPwd } = useFindPwd(findPwdUserInfo, findPwdCheck);

// 3. 정보 확인 후 비밀번호 업데이트 유효성 검사
const pwdValid = () => {
  const regExPwd = /^[a-zA-Z0-9]{4,40}$/;

  if (!findPwdUserInfo.value.pw || !findPwdUserInfo.value.pwCk) {
    toast.error("비밀번호를 모두 입력해주세요.");
    return;
  } else if (!regExPwd.test(findPwdUserInfo.value.pw)) {
    toast.error("비밀번호는 4~40자리여야 합니다.");
    return;
  } else if (findPwdUserInfo.value.pw !== findPwdUserInfo.value.pwCk) {
    toast.error("비밀번호가 일치하지 않습니다.");
    return;
  }
  handlerFindPwdUpdate();
};

// 3. 정보 확인 후 비밀번호 업데이트
const { mutate: handlerFindPwdUpdate } = useFindPwdUpdate(findPwdUserInfo);

// 모달창 닫기 버튼
const findUserPwdModalCloseBtn = () => {
  modalStore.setModalState();
};

// enter 키로 버튼 작동
handlerEnterKey(() => {
  findPwdCheck.value ? pwdValid() : findPwdVaild();
});
</script>

<style scoped>
/* 모달 전체 스타일 */
.findPwdModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 모달 내용 박스 */
.findPwdModalContent {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 480px;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.findPwdModalTitle {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20px;
  padding: 10px 20px;
  border-radius: 10px 10px 0 0;
}

.closeModalBtn {
  width: 40px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.closeModalBtn:hover {
  opacity: 0.7;
  transform: scale(1.1);
}

hr {
  border: 0;
  border-top: 1px solid gray;
  margin-bottom: 40px;
}

table {
  width: 100%;
}

th {
  background-color: rgb(220, 220, 220);
  width: 30%;
  text-align: center;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}
</style>
