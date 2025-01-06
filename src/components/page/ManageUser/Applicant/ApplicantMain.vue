<template>
  <div class="form-container">
    <ApplicantModal
      v-if="modalState.modalState"
      @postSuccess="refetch"
      @modalClose="() => (userLoginId = '')"
      :loginId="userLoginId"
    />
    <table class="form-table">
      <colgroup>
        <col width="10%" />
        <col width="15%" />
        <col width="20%" />
        <col width="20%" />
        <col width="20%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th>회원번호</th>
          <th>회원ID</th>
          <th>회원명</th>
          <th>이메일</th>
          <th>회원가입날짜</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="applicantList">
          <template v-if="applicantList.applicantCnt > 0">
            <tr
              v-for="applicant in applicantList.applicant"
              :key="applicant.userIdx"
            >
              <td>{{ applicant.userIdx }}</td>
              <td>{{ applicant.loginId }}</td>
              <td>{{ applicant.name }}</td>
              <td>{{ applicant.email }}</td>
              <td>{{ applicant.regdate }}</td>
              <td>
                <button @click="handlerUpdateModal(applicant.loginId)">
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
      :totalItems="applicantList?.applicantCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import { useApplicantListSearchQuery } from "../../../../hook/manageUser/useApplicantListSearchQuery";
import { useModalStore } from "../../../../stores/modalState";

const cPage = ref(1);
const modalState = useModalStore();
const userLoginId = ref("");
const injectedValue = inject("providedValue");

const {
  data: applicantList,
  isLoading,
  refetch,
  isSuccess,
  isError,
} = useApplicantListSearchQuery(injectedValue, cPage);

const handlerUpdateModal = (loginId) => {
  userLoginId.value = loginId;
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
