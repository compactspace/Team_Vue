<template>
  <div class="searchWrapper">
    <div class="selectArea">
    <select>
      <!-- 여기는 DB에서 기업이 공고를 추가할때마다 동적으로 생기니 추후 반복문 돌리면 될듯 -->
      <option>서류심사</option>
    </select>

    <select v-model="choiceStatus" @change="choiceStatusFnc">
      <option>서류심사</option>
      <option>면접진행</option>
      <option>최종합격</option>
      <option>불합격</option>
    </select>
</div>
  </div>
</template>
<script setup>
import { provide, ref } from 'vue';
import { watchEffect } from 'vue';
import { useApplicantListQuery } from '../../../hook/Applicant/useApplicantListQuery';
import { useApplicantStatusUpdateMutation } from '../../../hook/Applicant/useApplicantStatusUpdateMutation';
import { useUserInfo } from '../../../stores/userInfo';
const loginId=useUserInfo().user.loginId;


//이는 지원자의 탭별로 담을 값이다.
const choiceStatus=ref("서류심사중");







// 이제 스텝을 주의 해야한다.
// 현재 받은 디펄트 값은 서류 심사 중이다.

// 서류 합격시 => 면접진행중 => 최종합격

// 서류탈락   =>면접탈락    => 서류심사중 
const statusMesaage=ref('서류심사중')

const {data:applicantList ,isSuccess}=useApplicantListQuery(loginId,statusMesaage);

provide("provideValue",applicantList)

const choiceStatusFnc=()=>{
    console.log(choiceStatus.value)
}





</script>
<style>
.searchWrapper{
    justify-content: end;
display: flex;
}

.selectArea{


}

select {
  display: inline-block;
  padding:10px 10px
}
</style>
