<template>
  <ContextBox>기업 상세 조회</ContextBox>
  <div class="form-container">
    <table class="form-table">
      <tbody>
        <tr>
          <th colspan="4">기업 로고</th>
        </tr>
        <tr>
          <td colspan="4">
            <img
              v-if="bizDetail.logicalPath"
              :src="bizDetail.logicalPath"
              style="width: 50%"
              alt="biz logo"
            />
          </td>
        </tr>

        <tr>
          <th>사업자명</th>
          <th>사업자대표</th>
          <th>연락처</th>
          <th>사업자주소</th>
        </tr>
        <tr>
          <td>{{ bizDetail.bizName }}</td>
          <td>{{ bizDetail.bizCeoName }}</td>
          <td>{{ bizDetail.bizContact }}</td>
          <td>{{ bizDetail.bizAddr }}</td>
        </tr>

        <tr>
          <th>사원수</th>
          <th>홈페이지주소</th>
          <th>설립일</th>
          <th>매출액</th>
        </tr>
        <tr>
          <td>{{ bizDetail.bizEmpCount }}</td>
          <td>{{ bizDetail.bizWebUrl }}</td>
          <td>{{ bizDetail.bizFoundDate }}</td>
          <td>{{ bizDetail.bizRevenue }}</td>
        </tr>

        <tr>
          <th colspan="4">기업 소개</th>
        </tr>
        <tr>
          <td colspan="4">{{ bizDetail.bizIntro }}</td>
        </tr>
      </tbody>
    </table>
    <div class="button-div">
      <button class="button-back" @click="() => $router.go(-1)">
        기업 지원 공고 확인 하기
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const { params } = useRoute();
const bizDetail = ref({ logicalPath: "" });

const searchDetail = async () => {
  await axios
    .post("/prx/api//company/companyDetailPage.do", { bizIdx: params.bizIdx })
    // .post("/prx/api//company/companyDetailPage.do", { bizIdx: 3 })
    .then((res) => {
      bizDetail.value = res.data.payload;
    });
};

onMounted(() => {
  searchDetail();
});
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

.button-div {
  text-align: right;
  margin-top: 20px;
}
</style>
