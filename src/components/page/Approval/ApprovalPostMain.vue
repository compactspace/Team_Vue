<template>
  <div class="divPostList">
    <h4>
      <b-badge variant="light">
        총
        <b-badge pill variant="primary">
          {{ approvalList?.pendingPostCnt }}
        </b-badge>
        개의 글
      </b-badge>
    </h4>
    <table>
      <colgroup>
        <col width="10%" />
        <col width="30%" />
        <col width="10%" />
        <col width="10%" />
        <col width="15%" />
        <col width="15%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">근무 지역</th>
          <th scope="col">경력 여부</th>
          <th scope="col">마감일</th>
          <th scope="col">등록일</th>
          <th scope="col">승인 여부</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">로딩중...</template>
        <template v-else-if="isSuccess">
          <template v-if="approvalList.pendingPostCnt > 0">
            <tr
              v-for="post in approvalList.pendingList"
              :key="post.postIdx"
              @click="handlerDetail(post.postIdx)"
            >
              <td>{{ post.postIdx }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.workLocation }}</td>
              <td>{{ post.expRequired }}</td>
              <td>{{ post.endDate.substr(0, 10) }}</td>
              <td>{{ post.postDate.substr(0, 10) }}</td>
              <td>{{ post.appStatus }}</td>
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
      :totalItems="approvalList?.pendingPostCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useApprovalListSearchQuery } from "../../../hook/approval/useApprovalListSearchQuery";
import router from "../../../router";
import Pagination from "../../common/Pagination.vue";

const cPage = ref(1);
const injectedValue = inject("providedValue");
const route = useRoute();

const {
  data: approvalList,
  isLoading,
  isSuccess,
  isError,
  refetch,
} = useApprovalListSearchQuery(injectedValue, cPage);

const handlerDetail = (idx) => {
  router.push({
    name: "postDetail",
    params: { idx },
  });
};

watch(
  () => route.name,
  (newRoute) => {
    if (newRoute === "approval-post") {
      refetch();
    }
  }
);
</script>

<style>
.listCountBadge {
  font-weight: 600;
  font-size: 16px;
}

.listCountBadge:hover,
.listCountBadge:active,
.listCountBadge:visited {
  cursor: default;
  background-color: rgb(253, 253, 253);
  border: 1px solid rgb(253, 253, 253);
}
</style>

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
    background-color: #337fd1;
    color: white;
  }

  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #f5f5f5;
    opacity: 0.9;
    cursor: pointer;
  }
}
</style>
