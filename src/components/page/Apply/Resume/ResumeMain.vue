<template>
  현재 페이지: {{ currentPage }} 총 개수: {{ resumeList?.resumeCnt || 0 }}
  <div class="gallery-container" v-if="resumeList?.resumeCnt > 0">
    <div
      class="card"
      v-for="resume in resumeList.payload"
      :key="resume.resIdx"
      @click="handlerGetResumeBtn(resume.resIdx)"
    >
      <div class="image-wrapper">
        <img v-if="resume.logicalPath" :src="`/prx${resume.logicalPath}`" />
        <img v-else src="../../../../assets/logo.png" />
      </div>
      <div class="title_and_file">
        <div>
          {{ resume.resTitle }}
        </div>
        <div v-if="resume.fileName">
          <span class="title_above_file">첨부파일: </span>
          <span
            class="file_below_title"
            @click.stop="
              handlerDownImageBtn({
                resIdx: resume.resIdx,
                fileName: resume.fileName,
              })
            "
            >{{ resume.fileName }}</span
          >
        </div>
      </div>
      <div style="margin-left: 5px; font-size: clamp(8px, 2vw, 11px)">
        {{ resume.updatedDate }}
      </div>
      <div>
        <CommonButton @click.stop="handlerCopyResumeBtn(resume.resIdx)"
          >복사하기</CommonButton
        >
        <CommonButton @click.stop="handlerDeleteResumeBtn(resume.resIdx)"
          >삭제하기</CommonButton
        >
      </div>
    </div>
  </div>

  <!-- 페이지네이션 -->
  <Pagination
    :totalItems="resumeList?.resumeCnt || 0"
    :items-per-page="itemPerPage"
    :max-pages-shown="5"
    :onClick="queryClient.invalidateQueries({ queryKey: ['resumeList'] })"
    v-model="currentPage"
  />

  <!-- 모달 -->
  <CommonModalFrame>
    <ResumeDetail :resIdx="resIdx" />
  </CommonModalFrame>
</template>

<script setup>
import { useQueryClient } from "@tanstack/vue-query";
import { useResumeFileDownMutation } from "../../../../hook/apply/resume/useResumeFileDownMutation";
import { useResumeListReadQuery } from "../../../../hook/apply/resume/useResumeListReadQuery";
import { useResumeOneCopyMutation } from "../../../../hook/apply/resume/useResumeOneCopyMutation";
import { useResumeOneDeleteMutation } from "../../../../hook/apply/resume/useResumeOneDeleteMutation";
import { useModalStore } from "../../../../stores/modalState";

const itemPerPage = ref(5);
const currentPage = ref(1);
const queryClient = useQueryClient();
const resIdx = ref("");
const modalStore = useModalStore();

const handlerGetResumeBtn = (idx) => {
  modalStore.modalState = true;
  resIdx.value = idx;
};

const {
  data: resumeList, // useQuery(useResumeListSearchQuery) 내 callback함수 return값이 입력된다
  isLoading,
  isSuccess,
  isError,
  isStale, // 캐시유지 주기
  refetch, // 자동갱신 주기
} = useResumeListReadQuery(itemPerPage, currentPage);
const { mutate: handlerDownImageBtn } = useResumeFileDownMutation();
const { mutate: handlerCopyResumeBtn } = useResumeOneCopyMutation();
const { mutate: handlerDeleteResumeBtn } = useResumeOneDeleteMutation();

// 화면크기 변경시 반응형으로, itemPerRow의 배수이면서 12이상인 값을 itemPerPage로 정하는 계산함수
const calculateItemPerPage = () => {
  const gridContainer = document.querySelector(".gallery-container");
  const gridItems = document.querySelectorAll(".card");

  if (gridContainer && gridItems.length > 0) {
    const containerWidth = gridContainer.offsetWidth;
    const itemWidth = gridItems[0].offsetWidth;
    let itemPerRow = Math.floor(containerWidth / itemWidth);

    itemPerPage.value = Math.ceil(24 / itemPerRow) * itemPerRow;
    searchList();
  }
};

onMounted(() => {
  setTimeout(() => {
    calculateItemPerPage();
  }, 1000); // mount가 완료될때쯤 까지 delay건 후 calculateItemPerPage 함수 실행
  window.addEventListener("resize", calculateItemPerPage); // 리사이즈 이벤트 리스너 등록
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateItemPerPage); // 리사이즈 이벤트 리스너 제거
});
</script>

<style lang="scss" scoped></style>
