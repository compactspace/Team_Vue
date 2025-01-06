<template>
  <p v-if="props.isShow" class="resumeDetail_guidetext">
    • 최신순으로 작성해주세요.
  </p>
  <template v-for="(item, key) in eduList?.payload" :key="key">
    <div class="edu_table">
      <div class="garo_wrapper_lr" style="grid-area: admDate">
        <label class="garo_wrapper_lr_l">입학연도:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.admDate.slice(0, 7)" placeholder="입학연도" type="month" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: eduLevel">
        <label class="garo_wrapper_lr_l">학력구분:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.eduLevel" placeholder="학력구분" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: grdStatus">
        <label class="garo_wrapper_lr_l">졸업여부:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.grdStatus" placeholder="졸업여부" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: grdDate">
        <label class="garo_wrapper_lr_l">졸업연도:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.grdDate.slice(0, 7)" placeholder="졸업연도" type="month" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: schoolName">
        <label class="garo_wrapper_lr_l">학교명:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.schoolName" placeholder="학교명" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: major">
        <label class="garo_wrapper_lr_l">전공명:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.major" placeholder="전공명" disabled />
      </div>
      <div class="garo_wrapper_r" style="grid-area: button; display: flex; justify-content: right; align-items: center;">
        <CommonButton @click="handlerDeleteEduBtn({ resIdx: props.resume.resIdx, eduIdx: item.eduIdx })" v-if="props.isShow">삭제</CommonButton>
      </div>
    </div>
  </template>
  <button class="add_btn" @click="isAddEdu = !isAddEdu" style="border-radius: 5px; margin-bottom: 10px;" v-if="props.isShow">+ 추가</button>
  <div>
    <div class="edu_table" v-if="isAddEdu && props.isShow">
      <div class="garo_wrapper_lr" style="grid-area: admDate">
        <label class="garo_wrapper_lr_l">입학연도:</label>
        <input class="garo_wrapper_lr_r" v-model=edu.admDate placeholder="입학연도" type="month"></input>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: eduLevel">
        <label class="garo_wrapper_lr_l">학력구분:</label>
        <select class="garo_wrapper_lr_r" v-model=edu.eduLevel placeholder="학력구분">
          <option value="고등학교">고등학교</option>
          <option value="대학교">대학교</option>
          <option value="대학원(석사)">대학원(석사)</option>
          <option value="대학원(박사)">대학원(박사)</option>
        </select>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: grdStatus">
        <label class="garo_wrapper_lr_l">졸업여부:</label>
        <select class="garo_wrapper_lr_r" v-model=edu.grdStatus placeholder="졸업여부">
          <option value="졸업">졸업</option>
          <option value="재학">재학</option>
          <option value="휴학">휴학</option>
          <option value="중퇴">중퇴</option>
        </select>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: grdDate">
        <label class="garo_wrapper_lr_l">졸업연도:</label>
        <input class="garo_wrapper_lr_r" v-model=edu.grdDate placeholder="졸업연도" type="month"></input>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: schoolName">
        <label class="garo_wrapper_lr_l">학교명:</label>
        <input class="garo_wrapper_lr_r" v-model=edu.schoolName placeholder="학교명"></input>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: major">
        <label class="garo_wrapper_lr_l">전공명:</label>
        <input class="garo_wrapper_lr_r" v-model=edu.major placeholder="전공명"></input>
      </div>
      <div class="garo_wrapper_r" style="grid-area: button; display: flex; justify-content: right; align-items: center;">
        <CommonButton @click="{ handlerCreateEduBtn({ resIdx: props.resume.resIdx, edu: edu }); edu={ ...eduDefault } }">저장</CommonButton>
        <CommonButton @click="isAddEdu = false">취소</CommonButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import { useEduListReadQuery } from "../../../../../hook/apply/resume/edu/useEduListReadQuery";
import { useEduNewCreateMutation } from "../../../../../hook/apply/resume/edu/useEduNewCreateMutation";
import { useEduNewDeleteMutation } from "../../../../../hook/apply/resume/edu/useEduNewDeleteMutation";

const props = defineProps(["resume", "isShow"]);
const emits = defineEmits(["isExistEdu"]);
const resIdx = ref("");
const eduDefault = { admDate: '', eduLevel: '', grdStatus: '', grdDate: '', schoolName: '', major: ''};
const edu = ref({ ...eduDefault });
const isAddEdu = ref(false);

const { data: eduList } = useEduListReadQuery(resIdx);
const { mutate: handlerCreateEduBtn } = useEduNewCreateMutation();
const { mutate: handlerDeleteEduBtn } = useEduNewDeleteMutation();

watch(() => [props.resume.resIdx, eduList], () => {
  resIdx.value = props.resume.resIdx;
  if (eduList.payload && eduList.payload.length >= 1) emits("isExistCareer", true);
  else                                                emits("isExistCareer", false);
})
</script>

<style></style>
