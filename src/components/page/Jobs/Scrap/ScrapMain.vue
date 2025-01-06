<template>
  <div class="divPostList">
    <PostApplyModal
      v-if="modalState.modalState"
      @modalClose="refetch()"
      :postIdx="scrapList.postIdx"
    />
    현재 페이지: {{ cPage }} 총 개수: {{ postList?.approvalPostCnt }}
    <table>
      <colgroup>
        <col width="10%" />
        <col width="30%" />
        <col width="20%" />
        <col width="10%" />
        <col width="15%" />
        <col width="15%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">기업명</th>
          <th scope="col">공고 제목</th>
          <th scope="col">자격 요건</th>
          <th scope="col">근무 지역</th>
          <th scope="col">마감일</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">로딩중...</template>
        <template v-else-if="isSuccess">
          <template v-if="scrapList.scrapCnt > 0">
            <tr v-for="scrap in scrapList.scrapList" :key="scrap.scrapIdx">
              <td>체크박스</td>
              <td>{{ scrap.postBizName }}</td>
              <td @click="handlerDetail(scrap.postIdx)">
                {{ scrap.postTitle }}
              </td>
              <td>{{ scrap.postStatus }}</td>
              <td>{{ scrap.postWorkLocation }}</td>
              <td>{{ scrap.postExpRequired }}</td>
              <td>
                <b-button @click="handlerApply(scrap.postIdx)"
                  >입사지원</b-button
                >
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7">일치하는 검색 결과가 없습니다</td>
            </tr>
          </template>
        </template>
        <template v-else-if="isError">에러발생</template>
      </tbody>
    </table>
    <Pagination
      :totalItems="scrapList?.scrapCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useScrapListSearchQuery } from "../../../../hook/jobs/useScrapListSearchQuery";
import { useModalStore } from "../../../../stores/modalState";
import Pagination from "../../../common/Pagination.vue";

const router = useRouter();
const cPage = ref(1);
const injectedValue = inject("providedValue");
const modalState = useModalStore();

const {
  data: scrapList,
  isLoading,
  isSuccess,
  isError,
  refetch,
} = useScrapListSearchQuery(injectedValue, cPage);

const handlerDetail = (idx) => {
  router.push({
    name: "postDetail",
    params: { idx },
  });
};

const handlerApply = (idx) => {
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

  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #d3d3d3;
    opacity: 0.9;
    cursor: pointer;
  }
}
</style>
