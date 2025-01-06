<template>
  <div class="login-container">
    <div>
      <div class="login-text">
        <div class="login-image">
          <img alt="" :src="logo" />
        </div>
        <h3>안되는 것이 실패가 아니라 포기하는 것이 실패다</h3>
        <div>
          성공은 실패의 꼬리를 물고 온다.지금 포기한 것이 있는가 ?
          <br />
          그렇다면 다시 시작해 보자. <br />
          안되는 것이 실패가 아니라 포기하는 것이 실패다. <br />
          포기한 순간이 성공하기 5 분전이기 쉽다. <br />
          실패에서 더 많이 배운다. <br />
          실패를 반복해서 경험하면 실망하기 쉽다. <br />
          하지만 포기를 생각해선 안된다.실패는 언제나 중간역이지 종착역은
          아니다. <br />
        </div>
        <div>-이대희, ‘1 % 의 가능성을 희망으로 바꾼 사람들’ 에서</div>
      </div>
      <div class="login-box">
        <div class="buttons inputs">
          <div>
            <label> 아이디 </label>
            <input required v-model="loginInfo.lgn_Id" />
          </div>
          <div>
            <label> 비밀번호 </label>
            <input required type="password" v-model="loginInfo.pwd" />
          </div>
          <div>
            <button class="login-button" @click="handlerLogin">Login</button>
          </div>
        </div>
        <div class="joinDiv">
          <strong class="strong joinDivBtn" @click="findIdModalOpen"
            >아이디 찾기</strong
          >
          <span class="strong joinDivBtn noHoverCursor">|</span>
          <strong class="strong joinDivBtn" @click="findPwdModalOpen"
            >비밀번호 찾기</strong
          >
          <span class="strong joinDivBtn noHoverCursor">|</span>
          <strong class="strong joinDivBtn" @click="signUpModalOpen"
            >회원가입</strong
          >
        </div>
      </div>
    </div>
  </div>

  <!-- 모달 -->
  <FindIdModal v-if="modalStore.modalState && modalType === 'findIdModal'" />
  <FindPwdModal v-if="modalStore.modalState && modalType === 'findPwdModal'" />
  <SignUpModal v-if="modalStore.modalState && modalType === 'signUpModal'" />
</template>

<script setup>
import { useRouter } from "vue-router";
import logo from "../../../assets/logo.png";
import { nullCheck } from "../../../common/nullCheck";
import { useUserInfo } from "../../../stores/userInfo";

import { handlerEnterKey } from "@/common/handler/handlerEnterKey";
import { handlerEscKey } from "@/common/handler/handlerEscKey";
import { toast } from "@/common/toastMessage";
import { useModalStore } from "@/stores/modalState";
import FindIdModal from "./FindIdModal.vue";
import FindPwdModal from "./FindPwdModal.vue";
import SignUpModal from "./SignUpModal.vue";

const loginInfo = ref({});
const userInfo = useUserInfo();
const router = useRouter();
const modalStore = useModalStore();
const modalType = ref("");

const handlerLogin = async () => {
  const isNull = nullCheck([
    { inval: loginInfo.value.lgn_Id, msg: "아이디 입력 좀" },
    { inval: loginInfo.value.pwd, msg: "비밀번호 입력 좀" },
  ]);
  if (!isNull) {
    return;
  }
  const param = new URLSearchParams(loginInfo.value);
  const result = await userInfo.setUserData(param);
  if (result === "SUCCESS") {
    router.push("/vue");
  } else {
    toast.error("아이디 또는 비밀번호가 \n일치하지 않습니다.");
    return;
  }
};
// 모달 열기
const openModal = (type) => {
  modalStore.modalState = true;
  modalType.value = type;
};
// 아이디 찾기 모달
const findIdModalOpen = () => openModal("findIdModal");
// 비밀번호 찾기 모달
const findPwdModalOpen = () => openModal("findPwdModal");
// 회원가입 모달
const signUpModalOpen = () => openModal("signUpModal");

// Enter키로 로그인하기(모달창 띄우졌을때는 안되게 함)
handlerEnterKey(() => {
  if (!modalStore.modalState) {
    handlerLogin();
  }
});

// ESC키로 모달창 닫기
handlerEscKey(() => {
  modalStore.modatState.value = false;
});
</script>

<style scoped>
.login-container {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  text-align: center;
  background-image: radial-gradient(
    ellipse farthest-corner at 0 140%,
    #5d9dff 0%,
    #2178ff 70%,
    #3585ff 70%
  );
}

.login-image {
  background-position: center;
  width: 100%;
  border-radius: 10px 0px 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}
.login-box {
  background-color: white;
}

.buttons {
  padding-top: 20px;
  padding-bottom: 10px;
  justify-content: center;
  align-items: center;
  display: grid;
}

label {
  display: flex;
  font-size: 14px;
  color: #333333;
}

input {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.login-text {
  padding-top: 50px;
  padding-bottom: 30px;
  color: #ffffff;
}
.login-button {
  width: 100%;
  background-color: #2676bf;
  color: #ffffff;
}

.signup-button {
  background-color: #28a745;
  color: #ffffff;
}

button:hover {
  opacity: 0.9;
}
.joinDiv {
  font-size: 20px;
  padding-bottom: 20px;
}
.findDiv {
  font-size: small;
}
.strong {
  cursor: pointer;
}

.joinDivBtn {
  color: gray;
  margin: 0 10px;
}
.joinDivBtn:hover {
  color: black;
  transition: color 0.3s ease;
  text-decoration: underline;
}
.noHoverCursor {
  cursor: default;
}
</style>
