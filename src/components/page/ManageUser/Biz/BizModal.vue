<template>
  <teleport to="body">
    <div class="backdrop">
      <div class="container">
        <table class="form-table">
          <caption>
            기업회원정보
          </caption>
          <colgroup>
            <col with="25%" />
            <col with="25%" />
            <col with="25%" />
            <col with="25%" />
          </colgroup>
          <tbody>
            <tr>
              <th>사업자번호</th>
              <td colspan="3">
                <input
                  disabled
                  type="text"
                  class="input-text"
                  v-model="detailValue.bizIdx"
                />
              </td>
            </tr>
            <tr>
              <th>사업자명</th>
              <td colspan="3">
                <input
                  type="text"
                  class="input-text"
                  v-model="detailValue.bizName"
                />
              </td>
            </tr>
            <tr>
              <th>대표자</th>
              <td colspan="3">
                <input
                  type="text"
                  class="input-text"
                  v-model="detailValue.bizCeoName"
                />
              </td>
            </tr>
            <tr>
              <th>사원수</th>
              <td colspan="3">
                <input
                  type="text"
                  class="input-text"
                  v-model="detailValue.bizEmpCount"
                />
              </td>
            </tr>
            <tr>
              <th>매출액</th>
              <td colspan="3">
                <input
                  type="text"
                  class="input-text"
                  v-model="detailValue.bizRevenue"
                />
              </td>
            </tr>
            <tr>
              <th>연락처</th>
              <td colspan="3">
                <input
                  type="text"
                  class="input-text"
                  v-model="detailValue.bizContact"
                />
              </td>
            </tr>
            <tr>
              <th>사업자 주소</th>
              <td colspan="3">
                <input
                  type="text"
                  class="input-text"
                  v-model="detailValue.bizAddr"
                />
              </td>
            </tr>
            <tr>
              <th>홈페이지 주소</th>
              <td colspan="3">
                <input
                  type="url"
                  class="input-text"
                  v-model="detailValue.bizWebUrl"
                />
              </td>
            </tr>
            <tr>
              <th>설립일</th>
              <td colspan="3">
                <input
                  type="date"
                  class="input-text"
                  v-model="detailValue.bizFoundDate"
                />
              </td>
            </tr>
            <tr>
              <th>회사 소개</th>
              <td colspan="3">
                <input
                  type="text"
                  id="biz-intro"
                  class="input-text"
                  v-model="detailValue.bizIntro"
                  rows="1"
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
import { useBizDetailSearchQuery } from "../../../../hook/manageUser/useBizDetailSearchQuery";
import { useBizDetailUpdateMutation } from "../../../../hook/manageUser/useBizDetailUpdateMutation";
import { useModalStore } from "../../../../stores/modalState";

const emit = defineEmits(["postSuccess", "modalClose"]);
const props = defineProps(["idx"]);
const detailValue = ref({});
const modalState = useModalStore();

const {
  data: bizDetail,
  isLoading,
  isSuccess,
} = useBizDetailSearchQuery(props);

watchEffect(() => {
  if (isSuccess.value && bizDetail.value) {
    detailValue.value = toRaw(bizDetail.value.detail);
  }
});

const { mutate: handlerUpdate } = useBizDetailUpdateMutation(
  detailValue.value,
  props.idx,
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

#biz-intro {
  width: 100%;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;
  line-height: 1.5; /* 줄 간격 설정 */
}
</style>
