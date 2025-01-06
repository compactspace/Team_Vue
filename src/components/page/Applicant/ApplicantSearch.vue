<template>
  <h1>지원자 관리</h1>

  <div class="searchWrapper">
    <div class="selectArea" v-if="isSuccess">
      <div>
        <h1>{{ applicantList.MDetail[0].title }}</h1>
      </div>

      <div>
        <select>
          <option
            v-for="md in applicantList.MDetail"
            :key="md"
            :value="md.postIdx"
            @change="changeHirePostingFnc(md.postIdx)"
          >
            {{ md.title }}
          </option>
        </select>
        <select v-model="statusMesaage" @change="choiceStatusFnc(statusMesaage)">
          <option>서류심사중</option>
          <option>면접준비중</option>
          <option>최종합격</option>
          <option>불합격</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { useApplicantListQuery } from "../../../hook/Applicant/useApplicantListQuery";
import { useApplicantStatusUpdateMutation } from "../../../hook/Applicant/useApplicantStatusUpdateMutation";
import { useUserInfo } from "../../../stores/userInfo";
const loginId = useUserInfo().user.loginId;
const proValue = inject("proValue");
const postIdx = ref(null);

// 현재 받은 디펄트 값은 서류 심사 중이다.

// 서류 합격시 => 면접진행중 => 최종합격
// 서류탈락   =>면접탈락    => 서류심사중
const statusMesaage = ref("서류심사중");

const {
  data: applicantList,
  isSuccess,
  refetch,
} = useApplicantListQuery(loginId, statusMesaage, postIdx);

provide("provideValue", applicantList);

const choiceStatusFnc = async (statusMesaage) => {
  console.log(statusMesaage);

  await refetch(loginId, statusMesaage);
  console.log(applicantList.value);
  if ((proValue.value = applicantList.value != undefined)) {
    proValue.value = applicantList.value.ApplicantList.list[0];
  } else {
    proValue.value = null;
  }
  // console.log(applicantList.value)
  // console.log( proValue.value)
};

const changeHirePostingFnc = async (postIdx) => {
  await refetch(loginId, statusMesaage, postIdx);
  console.log(postIdx);
  if ((proValue.value = applicantList.value != undefined)) {
    proValue.value = applicantList.value.ApplicantList.list[0];
  } else {
    proValue.value = null;
  }
};
</script>
<style>
.searchWrapper {
  display: flex;
  justify-content: flex-end;
}

.selectArea {
  display: flex;
  width: 100%;
  gap: 30px;
  justify-content: space-between;
}

select {
  display: inline-block;
<<<<<<< HEAD
  padding:10px 10px
=======
  padding: 10px 10px;
>>>>>>> feat/#51
}
</style>
