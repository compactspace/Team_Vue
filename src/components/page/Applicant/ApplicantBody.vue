<template>
    <div
    v-if="injectedValue != null && injectedValue.count != 0"
    class="applicantFullInfoWrapper"
  >
    <!-- <h6>{{ injectedValue.list }}</h6> -->
    <div v-for="infoList in injectedValue.list" class="applicantFullInfoArea">
      <!-- 지원자의 상태: {{ infoList.status }} 지원가 지원한 포스팅아이디:
      {{ infoList.postIdx }}
       -->
      <div class="defaultInof sameInfocss">
        <div class="smaseLineCss headerline">지원자 기본 정보</div>
        <div class="smaseLineCss">지원자 이름{{ infoList.name }}</div>
        <div class="smaseLineCss">지원자 연락쳐{{ infoList.phone }}</div>
        <div class="smaseLineCss">지원자 이메일{{ infoList.email }}</div>
      </div>

      <div class="sameInfocss">
        <div class="educationInfo">지원자 학력 정보</div>
        <div class="smaseLineCss">지원자 최종학력{{ infoList.schoolName }}</div>
        <div class="smaseLineCss">지원자 이력서{{ infoList.resTitle }}</div>
        <div class="smaseLineCss">
          지원자 지원일{{ infoList.applyDate == null ? "오늘" : infoList.applyDate }}
        </div>
      </div>

      <!-- 합격을 보여줘야 할 탭은 서류심사중 / 면접진행중 탭이다.
     그리고 지원자의 이력서는 그냥 다 띄우자.
 -->
      <div class="sameInfocss">
        <div class="choiceArea">
          <button class="resumebtn">지원자이력서보기</button>

          <div v-if="infoList.status.indexOf('중') != -1" class="confrimInfo">
            <button
              class="successSameCss"
              @click="
                statusChangeFnc(
                  infoList.loginId,
                  infoList.postIdx,
                  infoList.status,
                  'success'
                )
              "
            >
              합격
            </button>

            <button
              id="fail-btn"
              class="faileSameCss"
              @mouseover="handleMouseOver"
              @mouseleave="handleMouseLeave"
              @click="
                statusChangeFnc(
                  infoList.loginId,
                  infoList.postIdx,
                  infoList.status,
                  'faile'
                )
              "
            >
              불합격
            </button>
          </div>
          <div v-if="infoList.status.indexOf('탈락') != -1">
            <button
              class="successSameCss"
              @click="
                statusChangeFnc(
                  infoList.loginId,
                  infoList.postIdx,
                  infoList.status,
                  'finalsuccess'
                )
              "
            >
              합격
            </button>
          </div>
          <div v-if="infoList.status.indexOf('최종') != -1">
            <!-- 여긴 보여줄게 없고 형식상의 v-if 문이다. -->
          </div>
        </div>
      </div>
      <div class="sameInfocss image-container">
        <!-- 이미지가 마우스 오버시 천천히 나타남 -->
        <img :src="sadd" alt="불합격 이미지" class="result-image" />
      </div>
    </div>
    <Pagination
      v-if="injectedValue.count != 0"
      :totalItems="injectedValue.count"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="clickFnc"
      v-model="cPage"
    />
  </div>

  <div v-else>
  <div class="noSearchArea">
  <img :src="noSearchImage" class="noSearchImage"/>
</div>
  </div>
  <div></div>
</template>
<script setup>
import { ref, inject } from "vue";
import { useApllicantStatusUpdateMutation } from "../../../hook/Applicant/useApllicantStatusUpdateMutation";
import { useApplicantPaginQuery} from "../../../hook/Applicant/useApplicantPaginQuery" 
import Pagination from '../../common/Pagination.vue'
import sadd from "../../../ImageApplicant/saddfrog.jpg";
import noSearchImage from "../../../ImageApplicant/noSearch.png";
const injectedValue = inject("provideVal");

const keyword = ref(null);
const choicePostIdx = ref(null);
const choiceLoginId = ref(null);

const cPage = ref(1);

const { data: paginList, refetch } = useApplicantPaginQuery(injectedValue, cPage);




const clickFnc = () => {
  // console.log(`현재페이지 ${cPage.value}`)
  refetch();
};

const statusChangeFnc = (loginId, postIdx, status, message) => {
  console.log(`status:  ${status}  message:  ${message}`);
  console.log(status.indexOf("탈락"));
  if (status.indexOf("탈락") != -1 && message == "finalsuccess") {
    console.log("모든 탈락은 그냥 서류 심사중으로 수정");
    status = "서류심사중";
  }
  if (message == "faile") {
    console.log(`${status} 상태에서 탈락했습니다.`);
    console.log(status.slice(0, 2));
    status = status.slice(0, 2) + "탈락";
  }

  if (status.indexOf("탈락") != 0 && message == "success") {
    if (status == "면접진행중") {
      console.log(`최종 합격입니다.`);
      status = "최종합격";
    } else {
      status = "면접진행중";
    }
  }

  keyword.value = status;
  choicePostIdx.value = postIdx;
  choiceLoginId.value = loginId;
  statusUpdat(keyword, postIdx, choiceLoginId);
};

const { mutate: statusUpdat } = useApllicantStatusUpdateMutation(
  keyword,
  choicePostIdx,
  choiceLoginId
);



const handleMouseOver = (e) => {


let sameInfocss= e.target.closest('.sameInfocss'); 

const hiddenBox = sameInfocss.nextElementSibling;
const saddfrogImage = sameInfocss.nextElementSibling.children[0];


hiddenBox.style.cssText = "opacity: 1; visibility: visible;   transition: opacity 1s ease, visibility 0s linear 0s; height:100%  ";

saddfrogImage.style.cssText="transform: rotate(180deg) scale(0.5); transition-property: all;  transition-duration: 3s;"



};

const handleMouseLeave = (e) => {
    let sameInfocss= e.target.closest('.sameInfocss'); 

const hiddenBox = sameInfocss.nextElementSibling;
const saddfrogImage = sameInfocss.nextElementSibling.children[0];

hiddenBox.style.cssText = "";

saddfrogImage.style.cssText=""


};
</script>

<style>
.applicantFullInfoWrapper {
  display: flex;
  flex-direction: column;
}

.applicantFullInfoArea {
  display: flex;
  width: 100%;
  gap: 5px;
}

.sameInfocss {
  max-height: 300px;
  /* height: 143px; */
  max-width: 320px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
  width: 300px;
}

button {
  display: inline-block;
  padding-top: 20px !important;
  padding-bottom: 20px !important;

  padding-left: 0px !important;

  padding-right: 0px !important;
}

.successSameCss {
  background-color: rgba(106, 130, 236, 0.8);
  color: #fff;
  text-align: center;
  border-radius: 5px;
  width: 100%;
  height: 80%;
}

.choiceArea {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}

.faileSameCss {
  background-color: #ff5862;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  width: 100%;
  height: 80%;
}

.confrimInfo {
  display: flex;
}

.headerline {
  background-color: #6d9cfa;
  color: #fff;
  margin: 0px 0px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 56px;
}

.educationInfo {
  background-color: #6d9cfa;
  color: #fff;
  margin: 0px 0px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 56px;
}

.smaseLineCss {
  width: 100%;
  margin: 0px 0px;
  font-size: 13px;
  font-weight: bold;
  line-height: 56px;
}
.resumebtn {
  background-color: #2189ff;
  color: #fff;
  margin: 0px 0px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 56px;
  border-radius: 10px;
}

/* 초기 상태에서 이미지 숨기기 */
.image-container {
    border:none !important;
  opacity: 0; /* 완전히 투명하게 설정 */
  visibility: hidden; /* 요소를 숨김 */
  transition: opacity 1s ease, visibility 0s linear 1s; /* 1초 동안 opacity를 변경하고, 숨겨질 때 1초 딜레이 */
  /* 화면에 꽉 차게 하는 코드(여기서는 너비를 꽉 채우는 용도) */
  /* background: rgba(0, 0, 0, 0.35); */
}

/* 이미지 크기 및 위치 설정 */
.result-image {
  display: inline-block;
  width: 100%;
  height: 100%;

}

.sadfrog{
border:none !important;

}
.noSearchWrapper{
display: flex;
justify-content: center;
align-items: center;
height: 960px;
}

.noSearchArea{
width: 100%;
text-align: center;

}
.noSearchImage{
  width: 50%!important;
  height: 50%;
  max-width: none;
}


.noSearchImage{
  border: 2px solid transparent; /* 초기 상태에서 투명한 테두리 설정 */
  animation: borderAnimation 4s forwards; /* 애니메이션을 4초 동안 실행 */
  animation: borderAnimation 4s infinite; /* 애니메이션을 무한 반복 */
}

@keyframes borderAnimation {

 
  0% {
    border-top-color: red;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
  25% {
    border-top-color: transparent;
    border-right-color: red;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
  50% {
    border-top-color:  transparent;
    border-right-color: transparent;
    border-bottom-color: red;
    border-left-color: transparent;
  }
  75% {
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color:  transparent;
    border-left-color: red;
  }
  100% {
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
}



</style>
