<template>
  
<ApplicantSearch/>

<ApplicantMain/>
<!-- <button @click="Fn1">포스팅아이디를 가져오기 </button>
<button @click="Fn2">포스팅아이디로 지원자 테이블에서 출력하기</button> -->
</template>

<script setup>
import ApplicantSearch from '../../components/page/Applicant/ApplicantSearch.vue';
import ApplicantMain from '../../components/page/Applicant/ApplicantMain.vue';





//applicant.do =>  백단에서 param loginId 을  int bizIdx = managehireService.managehireCkIndex(loginId); 으로 변환후
// => 공고 테이블 tb_hiring_post 에서 공고 정보를 가져온다.
// const Fn1=async ()=>{

// let   res=   await  axios.post('/prx/api/manage-hire/applicant.do',{loginId:loginId})
// console.log(res.data.MDetail[0].postIdx)
// }

// //applicantList.do => 지원자 테이블을 기준으로 하여 다음 변수들과 공고포스팅을 조인하여 출력한다.
// // param postIdx //바로위 axios오스에서 받은 정보의 키값으로 값을 초기화하고 다시 보낸다. 단 백단에서 스트링으로 보내라 하니 스트링 형식으로 보낸다.
// // param loginId
// // param firstProc 지원자의 초기값 상태로 그냥 빈문자열 '' 로 보내면 백단에서 그냥 서류심사중 으로 바꾸어준다.
// // param currentPage => 역시 스트링 형식으로
// // parma pageSize => 역시 스트링 형식으로
// // param keyword => 기본값으로 서류심사중 으로 보내라 

// const Fn2=async ()=>{


//     let   res=     await axios.post('/prx/api/manage-hire/applicantList.do',{loginId:loginId,firstProc:"지원완료",postIdx:"2",currentPage:"1",pageSize:"5",keyword:"서류심사중"})
    
//     console.log(res.data)

// }



</script>