<template>
  <div class="divHistoryList">
    현재 페이지: {{ currentPage }} 총 개수: {{ historyList?.historyCnt || 0 }}
    <table>
      <colgroup>
        <col width="15%" />
        <col width="40%" />
        <col width="15%" />
        <col width="15%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">지원일</th>
          <th scope="col">공고지원내역</th>
          <th scope="col">공고진행상태</th>
          <th scope="col">기업열람여부</th>
          <th scope="col">지원취소버튼</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">...로딩중</template>
        <template v-if="isSuccess">
          <template v-if="historyList?.result?.length > 0">
            <tr v-for="history in historyList.result" :key="history.appId">
              <td>
                {{ history.applyDate }}
              </td>
              <td>
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    font-size: 0.9vw;
                  "
                >
                  <div>
                    기업명:
                    <a
                      :href="`/vue/company/companyDetail.do/${history.bizIdx}`"
                      >{{ history.bizName }}</a
                    >
                  </div>
                  <div>
                    공고명:
                    <a :href="`/vue/jobs/posts.do/${history.postingId}`">{{
                      history.postTitle
                    }}</a>
                  </div>
                  <div>
                    이력서:
                    <span
                      @click="
                        {
                          modalStore.modalState = true;
                          resIdx = history.resIdx;
                        }
                      "
                      >{{ history.resTitle }}</span
                    >
                  </div>
                </div>
              </td>
              <td>
                {{ history.status }}
              </td>
              <td>
                {{ history.viewed == "1" ? "열람" : "미열람" }}
              </td>
              <td>
                <CommonButton
                  @click.stop="handlerCancleHistoryBtn(history.appId)"
                  :disabled="history.viewed == '1'"
                  :style="
                    history.viewed == '1' ? { backgroundColor: 'gray' } : {}
                  "
                  >{{
                    history.viewed == "1" ? "이미열람" : "지원취소"
                  }}</CommonButton
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
        <template v-if="isError">...에러</template>
      </tbody>
    </table>
  </div>

  <!-- 페이지네이션 -->
  <Pagination
    :totalItems="historyList?.historyCnt || 0"
    :items-per-page="itemPerPage"
    :max-pages-shown="5"
    :onClick="queryClient.invalidateQueries({ queryKey: ['historyList'] })"
    v-model="currentPage"
  />

  <!-- 모달 -->
  <CommonModalFrame>
    <ResumeDetail :resIdx="resIdx" />
  </CommonModalFrame>
</template>

<script setup>
import { useModalStore } from "@/stores/modalState";
import { useQueryClient } from "@tanstack/vue-query";
import { useHistoryListReadQuery } from "../../../../hook/apply/history/useHistoryListReadQuery";
import { useHistoryOneCancleMutation } from "../../../../hook/apply/history/useHistoryOneCancleMutation";
import Pagination from "../../../common/Pagination.vue";

const injectedHistorySearchValue = inject("providedHistorySearchValue");
const itemPerPage = ref(5);
const currentPage = ref(1);
const queryClient = useQueryClient();
const resIdx = ref(0);
const modalStore = useModalStore();

const {
  data: historyList,
  isLoading,
  isSuccess,
  isError,
  isStale, // 캐시유지 주기
  refetch, // 자동갱신 주기
} = useHistoryListReadQuery(
  itemPerPage,
  currentPage,
  injectedHistorySearchValue
);
const { mutate: handlerCancleHistoryBtn } = useHistoryOneCancleMutation();

watch(injectedHistorySearchValue, () => {
  currentPage.value = injectedHistorySearchValue.value.currentPage;
});
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px 0px 0px;
  font-size: 18px;
  text-align: left;
  background-color: #ffffff;

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

  tbody tr:hover {
    background-color: rgba(75, 248, 225, 0.561);
    opacity: 0.9;
    filter: drop-shadow(0 0 2em rgba(0, 255, 51, 0.667)); // 번짐효과
    transform: scale(1.005); // 확대효과
    transition: transform 0.05s; // 효과를 시간차
  }
}

a,
span {
  color: blue;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: rgb(0, 139, 49);
    transform: scale(1.2); // 확대효과
  }
}
</style>
