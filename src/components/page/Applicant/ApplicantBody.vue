<template>
  <div v-if="injectedValue != null && injectedValue.count != 0" class="applicantFullInfoWrapper">
    {{ provideMDVal }}
    <div class="headLineInfo">
      <span>해당 공고건: {{ injectedValue.list[0].title }}</span>
      <span>지원자 상태: {{ injectedValue.list[0].status }}의</span>
      <span>총수: {{ injectedValue.count }}</span>
    </div>
    <div v-for="infoList in injectedValue.list" class="applicantFullInfoArea">
      <!-- 지원자의 상태: {{ infoList.status }} 지원가 지원한 포스팅아이디:
      {{ infoList.postIdx }}
       -->
      <div class="defaultInof sameInfocss">
        <div class="smaseLineCss headerline">지원자 기본 정보</div>
        <div class="smaseLineCss">
          <div>지원자 이름:</div>
          <div>{{ infoList.name }}</div>
        </div>
        <div class="smaseLineCss">
          <div>지원자 연락쳐:</div>
          <div>{{ infoList.phone }}</div>
        </div>
        <div class="smaseLineCss">
          <div>지원자 이메일:</div>
          <div>{{ infoList.email }}</div>
        </div>
      </div>

      <div class="sameInfocss">
        <div class="educationInfo">지원자 학력 정보</div>
        <div class="smaseLineCss">
          <div>지원자 최종학력:</div>
          <div>{{ infoList.schoolName }}</div>
        </div>
        <div class="smaseLineCss">
          <div>지원자 이력서:</div>
          <div>{{ infoList.resTitle }}</div>
        </div>
        <div class="smaseLineCss">
          <div>지원자 지원일:</div>
          <div>{{ infoList.applyDate }}</div>
        </div>
      </div>

      <!-- 합격은 다음순위로 넘기고, 다음 스템에서만 보여주고
           불합은 불합으로 싹다 보여준다.
           또한 모든 불합에서의 합격은 처음 스텝으로 넘긴다.
        -->

      <template v-if="infoList.status == '합격'">
        <div class="sameInfocss chanceCss">
          <div class="hiringInfo">채용절차</div>
          <div class="finalchance">
            <div
              class="resumebtn"
              @click="
                {
                  modalStore.modalState = true;
                  resIdx = infoList.resIdx;
                }
              "
            >
              지원자이력서보기
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="infoList.status == '탈락'">
        <div class="sameInfocss chanceCss">
          <div class="hiringInfo">채용절차</div>
          <div class="finalchance">
            <div class="finallbtn" @click="chanceFnc(infoList.loginId, infoList.postIdx)">합격</div>
          </div>
        </div>
      </template>

      <!--  a ->b->d,.. -->
      <template v-else>
        <div class="sameInfocss">
          <div class="hiringInfo">채용절차</div>
          <div class="threeButtonWrapper">
            <div
              class="resumebtn"
              @click="
                {
                  modalStore.modalState = true;
                  resIdx = infoList.resIdx;
                }
              "
            >
              지원자이력서보기
            </div>

            <div class="confrimInfo">
              <div
                class="successSameCss"
                @click="
                  statusToBeChangeFnc(
                    infoList.loginId,
                    infoList.postIdx,
                    infoList.status,
                    'success'
                  )
                "
              >
                합격
              </div>
              <template v-if="infoList.status != '탈락'">
                <div
                  id="fail-btn"
                  class="faileSameCss"
                  @mouseover="handleMouseOver"
                  @mouseleave="handleMouseLeave"
                  @click="
                    statusToBeChangeFnc(
                      infoList.loginId,
                      infoList.postIdx,
                      infoList.status,
                      'faile'
                    )
                  "
                >
                  탈락
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
      <div class="sameInfocss image-container">
        <img :src="sadd" alt="불합격 이미지" class="result-image" />
      </div>
    </div>
    <br /><br /><br /><br />
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
      <img :src="noSearchImage" class="noSearchImage" />
    </div>
  </div>
  <div></div>

  <CommonModalFrame>
    <ResumeDetail :resIdx="resIdx" />
  </CommonModalFrame>
</template>
<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useApllicantStatusUpdateMutation } from "../../../hook/Applicant/useApllicantStatusUpdateMutation";
import { useApplicantPaginQuery } from "../../../hook/Applicant/useApplicantPaginQuery";
import noSearchImage from "../../../ImageApplicant/noSearch.png";
import sadd from "../../../ImageApplicant/saddfrog.jpg";
import Pagination from "../../common/Pagination.vue";
import { useModalStore } from "@/stores/modalState";

const modalStore = useModalStore();
const injectedValue = inject("provideVal");
const provideMDVal = inject("provideMDVal");
const keyword = ref(null);
const choicePostIdx = ref(null);
const choiceLoginId = ref(null);

const cPage = ref(1);

const { data: paginList, refetch } = useApplicantPaginQuery(injectedValue, cPage);
const router = useRouter();

const clickFnc = () => {
  console.log(`현재페이지 ${cPage.value}`);
  refetch();
};

const chanceFnc = (loginId, postIdx) => {
  choicePostIdx.value = postIdx;
  choiceLoginId.value = loginId;
  keyword.value = provideMDVal.value[0];
  console.log(provideMDVal.value[0] + "----" + keyword.value);
  console.log(`loginId, postIdx, keyword   ${loginId} ${postIdx}  ${keyword.value} `);

  statusUpdat(keyword, postIdx, choiceLoginId);
};

const statusToBeChangeFnc = (loginId, postIdx, status, message) => {
  console.log(`loginId, postIdx, status   ${loginId} ${postIdx}  ${status} `);

  let proccessArr = provideMDVal.value;
  let i = 0;
  for (let key in proccessArr) {
    //console.log(`key ->> ${key }   배열인덱스 값 ${proccessArr[key]} `)
    if (proccessArr[key] == status) {
      i = key;
      console.log("똩같음 i" + i);
      break;
    }
  }

  if (i <= proccessArr.length - 2) {
    i++;
    keyword.value = proccessArr[i];
    console.log("다음단계 키워드" + keyword.value);
  }
  if (message === "faile") {
    keyword.value = "탈락";
  }

  choicePostIdx.value = postIdx;
  choiceLoginId.value = loginId;

  console.log(`keyword.value:    ${keyword.value}`);

  statusUpdat(keyword, postIdx, choiceLoginId);
};

const { mutate: statusUpdat } = useApllicantStatusUpdateMutation(
  keyword,
  choicePostIdx,
  choiceLoginId
);
const resumeFnc = (resIdx) => {
  // path:'applicantresume.do?:resIdx',
  //         name:"volunteerresume",
  //         component: ApplicantResume,

  router.push({
    name: "volunteerresume",
    params: { resIdx },
  });
};

const handleMouseOver = (e) => {
  let sameInfocss = e.target.closest(".sameInfocss");

  const hiddenBox = sameInfocss.nextElementSibling;
  const saddfrogImage = sameInfocss.nextElementSibling.children[0];

  hiddenBox.style.cssText =
    "opacity: 1; visibility: visible;   transition: opacity 1s ease, visibility 0s linear 0s; height:100%  ";

  saddfrogImage.style.cssText =
    "transform: rotate(180deg) scale(0.5); transition-property: all;  transition-duration: 3s;";
};

const handleMouseLeave = (e) => {
  let sameInfocss = e.target.closest(".sameInfocss");

  const hiddenBox = sameInfocss.nextElementSibling;
  const saddfrogImage = sameInfocss.nextElementSibling.children[0];

  hiddenBox.style.cssText = "";

  saddfrogImage.style.cssText = "";
};
</script>

<style>
.applicantFullInfoWrapper {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

.applicantFullInfoArea {
  display: flex;
  width: 100%;
  gap: 20px;
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

.successSameCss {
  background-color: rgba(106, 130, 236, 0.8);
  color: #fff;
  text-align: center;
  border-radius: 5px;
  width: 100%;
  height: 80%;
  font-size: 16px;
  font-weight: bold;
  line-height: 56px;
  border-radius: 10px;
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
  font-size: 16px;
  font-weight: bold;
  line-height: 56px;
  border-radius: 10px;
}

.confrimInfo {
  display: flex;
}

.sameInfocss.chanceCss {
  height: 230px;
}

.finallbtn {
  background-color: rgba(106, 130, 236, 0.8);
  color: #fff;
  text-align: center;
  border-radius: 5px;
  width: 100%;
  /* height: 80%; */
  font-size: 16px;
  font-weight: bold;
  line-height: 56px;
  border-radius: 10px;
}

.finalchance {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.educationInfo,
.hiringInfo {
  background-color: #6d9cfa;
  color: #fff;
  margin: 0px 0px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 56px;
}

.smaseLineCss {
  gap: 10px;
  width: 100%;
  margin: 0px 0px;

  border-bottom: 1px solid black;
  display: flex;

  font-size: 16px;
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

.threeButtonWrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 12%;
  justify-content: space-around;
  height: 50%;
}

/* 초기 상태에서 이미지 숨기기 */
.image-container {
  border: none;
  opacity: 0; /* 완전히 투명하게 설정 */
  visibility: hidden; /* 요소를 숨김 */
  transition:
    opacity 1s ease,
    visibility 0s linear 1s; /* 1초 동안 opacity를 변경하고, 숨겨질 때 1초 딜레이 */
}

/* 이미지 크기 및 위치 설정 */
.result-image {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.sadfrog {
  border: none;
}
.noSearchWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 960px;
}

.noSearchArea {
  width: 100%;
  text-align: center;
}
.noSearchImage {
  width: 50%;
  height: 50%;
  max-width: none;
}

.noSearchImage {
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
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: red;
    border-left-color: transparent;
  }
  75% {
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: red;
  }
  100% {
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
}
.headLineInfo {
  background-color: #f2f2f2;
  font-weight: bold;
  padding: 10px;
  border: 0px solid;
  border-top: 0.5px solid #ddd;
  border-bottom: 0.5px solid #ddd;
  text-align: left;
}

.headLineInfo span {
  display: inline-block;
  padding: 10px 10px;
}
</style>
