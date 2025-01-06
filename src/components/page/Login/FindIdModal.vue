<template>
  <div class="findIdModal">
    <div class="findIdModalContent">
      <div class="findIdModalTitle">
        <h1>아이디 찾기</h1>
        <span>
          <img
            src="../../../../public/icon_close.png"
            class="closeModalBtn"
            @click="findUserIdModalCloseBtn"
          />
        </span>
      </div>
      <table>
        <tr>
          <td colspan="2">
            <hr />
          </td>
        </tr>

        <tr v-if="!findIdUserInfo.foundId">
          <th>
            <label for="name">이름</label>
          </th>
          <td>
            <input
              type="text"
              id="name"
              v-model="findIdUserInfo.name"
              placeholder="가입하신 이름을 입력하세요."
            />
          </td>
        </tr>

        <tr v-if="!findIdUserInfo.foundId">
          <th>
            <label for="email">이메일</label>
          </th>
          <td>
            <input
              type="text"
              id="email"
              v-model="findIdUserInfo.email"
              placeholder="가입하신 이메일을 입력하세요."
            />
          </td>
        </tr>

        <tr class="findIdTr" v-if="findIdUserInfo.foundId">
          <th>
            <label for="userId">아이디</label>
          </th>
          <td>
            <input
              type="text"
              id="userId"
              v-model="findIdUserInfo.foundId"
              readonly
            />
          </td>
        </tr>
      </table>
      <button
        class="handlerFindIdBtn"
        @click="handlerFindId"
        v-if="!findIdUserInfo.foundId"
      >
        확인
      </button>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from "@/stores/modalState";
import { ref } from "vue";
import { findId } from "../../../hook/Login/findId";

const modalStore = useModalStore();
const findIdUserInfo = ref({
  name: "",
  email: "",
  foundId: "",
});

// 1. 아이디 찾기 버튼
const { mutate: handlerFindId } = findId(findIdUserInfo);

// 모달창 닫기 버튼
const findUserIdModalCloseBtn = () => {
  modalStore.setModalState();
};
</script>

<style scoped>
/* 모달 전체 스타일 */
.findIdModal {
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
.findIdModalContent {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 480px;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.findIdModalTitle {
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

.findIdTr th,
.findIdTr td {
  background-color: rgb(79, 238, 150);
}
</style>
