<template>
    <button @click="getResumeFnc">이력서정보 내놔</button>

    <template v-if="isSuccess">
        {{ resumeFullList }}

    </template>


</template>

<script setup>
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useApplicantResumeListQuery } from '../../../hook/Applicant/useApplicantResumeListQuery';


const {params}=useRoute();

const resIdx=params.resIdx;

const {data:resumeFullList,isSuccess}=useApplicantResumeListQuery(resIdx)









const getResumeFnc=async ()=>{
    console.log(params)


    let  res1;
    let res2;
    let res3;
    let res4;
    try{
        
        res1=await axios.post('/prx/api/apply/resumeDetail',{resIdx:params.resIdx});
        res2=await axios.post('/prx/api/apply/careerList',{resIdx:params.resIdx});
        res3=await axios.post('/prx/api/apply/educationList',{resIdx:params.resIdx});
        res4=await axios.post('/prx/api/apply/skillList',{resIdx:params.resIdx});                
        console.log(res1.data.payload)
        console.log(res2.data.payload[0])
        console.log(res3.data.payload[0])
        console.log(res4.data.payload[0])
    }catch(err){
        //데이터는 모두 한번에 정확히 와야한다. 실패하면 리패치 함수를 추가한다.
        console.log(err)
    }




}






</script>
