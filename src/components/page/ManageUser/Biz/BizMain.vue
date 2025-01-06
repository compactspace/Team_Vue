<template>
  <div class="form-container">
    <BizModal
      v-if="modalState.modalState"
      @postSuccess="refetch"
      @modalClose="() => (bizIdx = 0)"
      :idx="bizIdx"
    />
    <table class="form-table">
      <colgroup>
        <col width="10%" />
        <col width="15%" />
        <col width="15%" />
        <col width="20%" />
        <col width="25%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th>사업자번호</th>
          <th>사업자명</th>
          <th>대표자</th>
          <th>연락처</th>
          <th>홈페이지</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="bizList">
          <template v-if="bizList.bizCnt > 0">
            <tr v-for="biz in bizList.biz" :key="biz.userIdx">
              <td>{{ biz.bizIdx }}</td>
              <td>{{ biz.bizName }}</td>
              <td>{{ biz.bizCeoName }}</td>
              <td>{{ biz.bizContact }}</td>
              <td>{{ biz.bizWebUrl }}</td>
              <td>
                <button @click="handlerUpdateModal(biz.bizIdx)">
                  정보수정
                </button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7" class="not-info">
                일치하는 검색 결과가 없습니다.
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <Pagination
      :totalItems="bizList?.bizCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useBizListSearchQuery } from "../../../../hook/manageUser/useBizListSearchQuery";
import { useModalStore } from "../../../../stores/modalState";

const route = useRoute();
const cPage = ref(1);
const modalState = useModalStore();
const bizIdx = ref("");
const injectedValue = inject("providedValue");

const {
  data: bizList,
  isLoading,
  refetch,
  isSuccess,
  isError,
} = useBizListSearchQuery(injectedValue, cPage);

const handlerUpdateModal = (idx) => {
  bizIdx.value = idx;
  modalState.setModalState();
};
</script>

<style lang="scss" scoped>
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
    text-align: center;
  }

  th {
    background-color: #2676bf;
    color: #ddd;
  }
}

.not-info {
  font-size: 36px;
}

button {
  padding: 6px 12px;
  margin: 5px;
  border-radius: 4px;
  border: none;
  background-color: #1378e4;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #003d7e;
}
</style>
