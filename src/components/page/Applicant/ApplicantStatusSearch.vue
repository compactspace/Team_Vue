<template>
  <template v-if="isSuccess">
    <div class="searchWrapper">
      <div class="searchBox">
        <div class="searchArea">
          <div>포스팅내역조회</div>
          {{ MDetail.hireProcessArr }}
          <select
            @click="postIdxChangeFnc(MDetail.hireProcessArr[postIdx])"
            v-model="postIdx"
            class="postingArea"
          >
            <option v-for="m in MDetail.Md" :value="m.postIdx">{{ m.title }}</option>
          </select>
        </div>
        <div class="searchArea">
          <div>지원자 상태 관리</div>
          <select v-model="choiceStatus" @change="choiceStatusFnc" class="statusArea">
            <option v-for="hirProcess in MDetail.hirProcess" :value="hirProcess">
              {{ hirProcess }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </template>
</template>
/
<script setup>
import { useGetMDetailQuery } from "../../../hook/Applicant/useGetMDetailQuery";
import { useGetApplicantListQUery } from "../../../hook/Applicant/useGetApplicantListQUery";
import { ref, inject } from "vue";
import { watch } from "vue";
import { useUserInfo } from "../../../stores/userInfo";

const loginId = useUserInfo().user.loginId;

//독립적이다.
const MDetail = ref({});

const provideMDVal = inject("provideMDVal");

//현재 applicant를 페이징 용으로 사용할건데 혹시 모르니 변수명을 최후에 고칠것이다.
const pageSetting = ref({
  currentPage: 1,
  pageSize: 5,
});
const postIdx = ref(null);
const choiceStatus = ref(null);
const injectedValue = inject("provideVal");
const hireProcessArr = ref([]);

const { data: Mdetail, isSuccess } = useGetMDetailQuery(
  postIdx,
  MDetail,
  choiceStatus,
  provideMDVal
);

const { data: applicantlist, refetch } = useGetApplicantListQUery(
  loginId,
  hireProcessArr,
  postIdx,
  pageSetting,
  choiceStatus,
  injectedValue
);

const postIdxChangeFnc = (x) => {
  hireProcessArr.value = x;

  refetch();
};

const choiceStatusFnc = () => {
  refetch();
};
</script>
<style>
.searchWrapper,
.searchArea,
.searchBox {
  display: flex;
}
.searchWrapper {
  justify-content: end;
  padding: 20px 20px;
}

.searchBox {
  width: 50%;
  justify-content: space-around;
  gap: 20px;
}

.searchArea {
  width: 100%;
  justify-content: space-around;
  font-size: 20px;
  font-weight: 600;
  align-items: center;
}
.postingArea,
.statusArea {
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
}
</style>
