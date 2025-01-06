<template>
  <div class="divPostList">
    <div class="topBtnArea">
      <b-button variant="light">
        총
        <b-badge pill variant="primary">
          {{ hirePostList?.hireCnt }}
        </b-badge>
        개의 글
      </b-button>
      <span style="float: right">
        <b-button variant="primary" @click="handlerEditor">공고 등록</b-button>
      </span>
    </div>
    <table>
      <colgroup>
        <col width="40%" />
        <col width="20%" />
        <col width="15%" />
        <col width="15%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">공고 제목</th>
          <th scope="col">경력 여부</th>
          <th scope="col">게시일</th>
          <th scope="col">채용 기간</th>
          <th scope="col">승인 여부</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="hirePostList">
          <template v-if="hirePostList.hireCnt > 0">
            <tr
              v-for="post in hirePostList.resultList"
              :key="post.postIdx"
              @click="handlerDetail(post.postIdx)"
            >
              <td>{{ post.title }}</td>
              <td>{{ post.expRequired }}</td>
              <td>{{ post.postDate }}</td>
              <td>{{ post.endDate }}</td>
              <td>{{ post.appStatus }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="6">일치하는 검색 결과가 없습니다</td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <Pagination
      :totalItems="hirePostList?.hireCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
// import { useRoute } from "vue-router";

// const route = useRoute();
const hirePostList = ref();
const cPage = ref(1);
// const injectedValue = inject("providedValue");
// const managePostIdx = ref(0);
const router = useRouter();

const searchList = () => {
  const param = new URLSearchParams({
    currentPage: cPage.value,
    pageSize: 5,
  });

  axios.post("/prx/api/manage-hire/post-list.do", param).then((res) => {
    hirePostList.value = res.data;
  });
};

const handlerEditor = () => {
  router.push({
    name: "hire-post-create",
  });
};

const handlerDetail = (idx) => {
  router.push({
    name: "postDetail",
    params: { idx },
  });
};

onMounted(() => {
  searchList();
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

  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #d3d3d3;
    opacity: 0.9;
    cursor: pointer;
  }
}

.topBtnArea {
  width: 100%;
  margin-top: 20px;
}

button {
  min-width: 90px;
}

// button {
//   padding: 6px 12px;
//   margin: 5px;
//   border-radius: 4px;
//   border: none;
//   background-color: #1378e4;
//   color: white;
//   cursor: pointer;
// }

// button:hover {
//   background-color: #003d7e;
// }
</style>
