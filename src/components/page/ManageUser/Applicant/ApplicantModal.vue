<template>
  <teleport to="body">
    <div class="backdrop">
      <div class="container">
        <table class="form-table">
          <caption>
            개인회원정보
          </caption>
          <colgroup>
            <col with="25%" />
            <col with="25%" />
            <col with="25%" />
            <col with="25%" />
          </colgroup>
          <tbody>
            <tr>
              <th>유저타입</th>
              <td colspan="3">
                <select v-model="detailValue.userType">
                  <option selected disabled>선택</option>
                  <option value="A">개인회원</option>
                  <option value="B">기업회원</option>
                </select>
              </td>
            </tr>

            <tr>
              <th>아이디</th>
              <td colspan="3">
                <input
                  type="text"
                  class="input-text"
                  v-model="detailValue.loginId"
                />
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td colspan="3">
                <button @click="handlerPasswordReset">초기화</button>
              </td>
            </tr>
            <tr>
              <th>이름</th>
              <td colspan="3">
                <input
                  type="text"
                  class="input-text"
                  v-model="detailValue.name"
                />
              </td>
            </tr>
            <tr>
              <th>성별</th>
              <td colspan="3">
                <select v-model="detailValue.sex">
                  <option selected disabled>선택</option>
                  <option value="1">남자</option>
                  <option value="2">여자</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td colspan="3">
                <input
                  type="date"
                  id="birthday"
                  v-model="detailValue.birthday"
                />
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td colspan="3">
                <input type="text" id="phone" v-model="detailValue.phone" />
              </td>
            </tr>
            <tr>
              <th>가입일자</th>
              <td colspan="3">
                <input
                  disabled
                  type="date"
                  id="birthday"
                  v-model="detailValue.birthday"
                />
              </td>
            </tr>
            <tr>
              <th>활성화</th>
              <td colspan="3">
                <select v-model="detailValue.statusYn">
                  <option selected disabled>선택</option>
                  <option value="1">활성</option>
                  <option value="2">비활성</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>우편번호</th>
              <td colspan="2">
                <input
                  type="text"
                  id="zip-code"
                  v-model="detailValue.zipCode"
                />
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td colspan="3">
                <input type="text" id="address" v-model="detailValue.address" />
              </td>
            </tr>
            <tr>
              <th>상세주소</th>
              <td colspan="3">
                <input
                  type="text"
                  id="address"
                  v-model="detailValue.detailAddress"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="button-div">
          <button id="update-button" @click="handlerUpdate">수정</button>
          <button id="cancle-button" @click="handlerModal">취소</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useApplicantDetailSearchQuery } from "../../../../hook/manageUser/useApplicantDetailSearchQuery";
import { useApplicantDetailUpdateMutation } from "../../../../hook/manageUser/useApplicantDetailUpdateMutation";
import { useApplicantPwResetMutation } from "../../../../hook/manageUser/useApplicantPwResetMutation";
import { useModalStore } from "../../../../stores/modalState";

const emit = defineEmits(["postSuccess", "modalClose"]);
const props = defineProps(["loginId"]);
const detailValue = ref({});
const modalState = useModalStore();

const {
  data: applicantDetail,
  isLoading,
  isSuccess,
} = useApplicantDetailSearchQuery(props);

watchEffect(() => {
  if (isSuccess.value && applicantDetail.value) {
    detailValue.value = toRaw(applicantDetail.value.detail);
  }
});

const { mutate: handlerPasswordReset } = useApplicantPwResetMutation(
  props.loginId
);

const { mutate: handlerUpdate } = useApplicantDetailUpdateMutation(
  detailValue.value,
  props.loginId,
  modalState
);

const handlerModal = () => {
  modalState.setModalState();
};

onUnmounted(() => {
  emit("modalClose");
});
</script>

<style lang="scss" scoped>
caption {
  display: table-caption;
  caption-side: top;
  font-size: 25px;
  font-weight: bold;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px 0px 0px;
  font-size: 18px;
  text-align: left;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  input,
  select {
    font-size: 15px;
  }
  th {
    background-color: #5ca4c5;
    color: #ddd;
  }

  button {
    background-color: #8abfd8;
    border: none;
    color: white;
    padding: 10px 22px;
    text-align: right;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    transition: 0.3s;

    &:hover {
      background-color: #45a049;
    }

    &:active {
      background-color: #3e8e41;
      box-shadow: 0 2px #666;
      transform: translateY(2px);
    }
  }
}

.backdrop {
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  font-weight: bold;
}

.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 400px;
}

.button-div {
  display: flex;
  justify-content: center;
}

#update-button {
  background-color: #3d96c0;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: right;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px #999;
  transition: 0.3s;

  &:hover {
    background-color: #33a539;
  }

  &:active {
    background-color: #239127;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}

#cancle-button {
  background-color: #8abfd8;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: right;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px #999;
  transition: 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}
</style>
