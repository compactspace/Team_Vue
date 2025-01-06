<template>
     <h2>지원자 관리</h2>
  <h3 @click="howToUseFnc">사용설명클릭</h3>
  <template v-if="isSuccess">
    <div class="searchWrapper">
    <div class="searchBox">
      <div class="searchArea">
      <div>포스팅내역조회</div>
        <select @click="postIdxChangeFnc" v-model="postIdx" class="postingArea">
            <option v-for="m in MDetail" :value="m.postIdx">{{ m.title }}</option>
        </select>
      </div>
      <div class="searchArea">
        <div>지원자 상태 관리</div>
        <select v-model="choiceStatus" @change="choiceStatusFnc" class="statusArea">
          <option>서류심사중</option>
          <option>면접진행중</option>
          <option>최종합격</option>
          <option>탈락</option>
        </select>
      </div>
    </div>
    </div>
  </template>
</template>

<script setup>
import { useGetMDetailQuery } from "../../../hook/Applicant/useGetMDetailQuery";
 import { useGetApplicantListQUery2 } from "../../../hook/Applicant/useGetApplicantListQUery2";
import { ref, inject } from "vue";
import { watch } from "vue";

//독립적이다.
const MDetail = ref(null);

//현재 applicant를 페이징 용으로 사용할건데 혹시 모르니 변수명을 최후에 고칠것이다.
const pageSetting = ref({
  currentPage: 1,
  pageSize: 5,
});
const postIdx = ref(null);
const choiceStatus = ref("서류심사중");
const injectedValue = inject("provideVal");



const { data: Mdetail, isSuccess } = useGetMDetailQuery(postIdx, MDetail);

const { data: applicantlist, refetch } = useGetApplicantListQUery2(
  postIdx,
  pageSetting,
  choiceStatus,
  injectedValue
);

const postIdxChangeFnc = () => {
  refetch();
};

const choiceStatusFnc = () => {
  refetch();
};

watch(postIdx, () => {
  if (postIdx.value != null) {
    refetch(); // postIdx가 null이면 refetch를 수동으로 호출
  }
});

const howToUseFnc=()=>{
  const body = document.body;
  const postingArea = document.querySelectorAll('.searchArea');
  console.log(postingArea)
  body.classList.toggle('grayscale');
  body.classList.toggle('normal');
  postingArea.forEach(button => {
  //  button.classList.toggle('white-text');
    button.classList.toggle('show-hint'); // 버튼에 설명 보이기 또는 숨기기
  });

}

</script>
<style>

body.grayscale {
  background-color: #333;
  filter: #333;
  
}

body.normal {
  /* background-color: #fff; */
}


.searchWrapper,
.searchArea,.searchBox {
  display: flex;
  
}
.searchWrapper {
  justify-content: start;
  padding: 20px 20px;
}

.searchBox{
  width: 50%;
  justify-content: space-around;
}

.searchArea{
  width: 100%;
  justify-content:space-around;
  font-size: 20px;
  font-weight: 600;
}
.postingArea,
.statusArea {
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
 
}

.searchArea::after {
  content: "attr(data-hint)";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: white;
  background-color: #333;
  padding: 5px 10000000000000000px;
  border-radius: 5px;
  display: none; /* 초기에는 숨김 */
  white-space: nowrap;
  margin-top: 5px;
}

.searchArea.show-hint::after {
  display: block;
}
</style>
