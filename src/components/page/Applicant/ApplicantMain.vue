<template>
  <!-- 
    합격 버튼 플로우
    서류심사중 ->면접준비중->최종합격

    불합격 버튼 플로우
    서류탈락 -> 면접탈락

     -->
  <div v-if="proValue != undefined || proValue != null" class="applicantWrapper">
   
    <div class="infoArea samegridCss">
        <div>
            지원자 성함:{{ proValue.name }} 
        </div>
        <div>
            이력서:  {{ proValue.resTitle }}
        </div>
        <div>
          지원일: {{ proValue.applyDate }}
        </div>
   
    </div>
<!-- {{ proValue }} -->
    <div class="educateArea samegridCss">

        <div>
            지원자 학력:{{ proValue.schoolName }} 
        </div>
        <div>
            연락처:  {{ proValue.phone }}
        </div>
        <div>
          이메일: {{ proValue.email }}
        </div>

    </div>

    <div class="choiceArea samegridCss">
      <div
        class="successArea sameAreacss "
        v-if="proValue.status === '서류심사중' || proValue.status === '면접준비중'"
      >
        <button class="resumebtn" @click="showResume(proValue.resIdx)">지원자 이력서 보기</button>
        <div class="btnArea">
          <button @click="합격클릭(proValue.status, 'success')" class="sbtn">합격</button>
          <button :value="faile" @click="합격클릭(proValue.status, 'faile')" class="fbtn">
            불합격
          </button>
        </div>
      </div>

      <div
        class="faileArea sameAreacss"
        v-if="proValue.status === '서류탈락' || proValue.status === '면접탈락'"
      >
        <button @click="합격클릭(proValue.status, 'success')">재합격</button>
        <button :value="faile" @click="합격클릭(proValue.status, 'faile')">불합격</button>
      </div>

      <div v-if="proValue.status === '최종합격'">
        <h3>지원자 이력서 보기</h3>
        <button>지원자 이력서 보기</button>
      </div>
    </div>
  </div>
  <div v-else class="nosearchApplicantListArea">
    <h1>검색조건에 없습니다.</h1>
  </div>
 
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref, inject } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
import { useApplicantStatusUpdateMutation } from "../../../hook/Applicant/useApplicantStatusUpdateMutation";

const proValue = inject("proValue");
import axios from "axios";
const choiceStatus = ref({});
// 합격 버튼 플로우
// 서류심사중 ->면접준비중->최종합격

// 불합격 버튼 플로우
// 서류탈락 -> 면접탈락
console.log(proValue.postIdx);

const { mutate: updateBtn } = useApplicantStatusUpdateMutation(choiceStatus);

const 합격클릭 = async (data, message) => {
  // console.log(message)
  // console.log(proValue.value.postIdx)
  let status;
  if (data === "서류심사중") status = "면접준비중";
  if (data === "면접준비중") status = "최종합격";
  if (data.indexOf("탈락") != -1) status = "서류심사중";
  if (message === "faile") {
    if (data === "서류심사중") status = "서류탈락";
    if (data === "면접준비중") status = "면접탈락";
  }

  console.log(status);
  const bodyData = {
    keyword: status,
    loginId: proValue.value.loginId,
    postIdx: proValue.value.postIdx,
  };
  choiceStatus.value = bodyData;

  //console.log( choiceStatus.value)
  updateBtn(choiceStatus);
  // await axios.post('/api/vuegetboardStatusUpdate.do', bodyData);
};

const client = useQueryClient();

const router=useRouter();

const showResume=(resIdx)=>{

    console.log(resIdx)

router.push({
   
            name:"volunteerresume",
             params:{resIdx},
})

}

</script>
<style>
.applicantWrapper {
  display: flex;
  justify-content: space-around;
  box-shadow:10px 10px 30px #000;


}

.samegridCss {
  width: 30%;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-evenly;
}

button {
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  margin-right: 5px;
}
.sbtn {
  background-color: #fff;
  border: 1px solid #007bff;
  color: #007bff;
}

.fbtn {
  background-color: #fff;
  border: 1px solid #dc3545;
  color: #dc3545;
}
.resumebtn {
  background-color: #fff;
  border: 1px solid;
  color: #000;
}
.sameAreacss {
  display: flex;
}



.successArea {
    justify-content: space-evenly;
  flex-direction: column;
  height: 90%;
}
.btnArea {
  display: flex;
  justify-content: center;
}

.nosearchApplicantListArea{
    height: 200px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


</style>
