<template>
  <p v-if="props.isShow" class="resumeDetail_guidetext">
    • 담당하신 업무 중 우선순위가 높은 업무를 선별하여 최신순으로 작성해주세요. <br />
    • 신입의 경우, 직무와 관련된 대외활동, 인턴, 계약직 경력 등이 있다면 작성해주세요. <br />
    • 업무 또는 활동 시 담당했던 역할과 과정, 성과에 대해 자세히 작성해주세요. <br />
    • 현재 재직중이면 퇴사일을 해당월로 입력해주세요.
  </p>
  <template v-for="(item, key) in careerList?.payload" :key="key">
    <div class="career_table">
      <div class="garo_wrapper_lr" style="grid-area: startDate">
        <label class="garo_wrapper_lr_l">입사일:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.startDate.slice(0, 7)" placeholder="입사일" type="month" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: company">
        <label class="garo_wrapper_lr_l">회사명:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.company" placeholder="회사명" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: dept">
        <label class="garo_wrapper_lr_l">부서명:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.dept" placeholder="부서명" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: endDate">
        <label class="garo_wrapper_lr_l">퇴사일:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.endDate.slice(0, 7)" placeholder="퇴사일" type="month" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: position">
        <label class="garo_wrapper_lr_l">직급/직책:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.position" placeholder="직급/직책" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: reason">
        <label class="garo_wrapper_lr_l">퇴사사유:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.reason" placeholder="퇴사사유" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: crrDesc">
        <label class="garo_wrapper_lr_l">담당업무:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.crrDesc" placeholder="담당업무" disabled />
      </div>
      <div class="garo_wrapper_r" style="grid-area: button">
        <CommonButton @click="handlerDeleteCareerBtn({ resIdx: props.resume.resIdx, crrIdx: item.crrIdx })" v-if="props.isShow">삭제</CommonButton>
      </div>
    </div>
  </template>
  <button class="add_btn" @click="isAddCareer = !isAddCareer" v-if="props.isShow">+ 추가</button>
  <div>
    <div class="career_table" v-if="isAddCareer && props.isShow">
      <div class="garo_wrapper_lr" style="grid-area: startDate">
        <label class="garo_wrapper_lr_l">입사일:</label>
        <input class="garo_wrapper_lr_r" v-model=career.startDate placeholder="입사일" type="month"></input>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: company">
        <label class="garo_wrapper_lr_l">회사명:</label>
        <input class="garo_wrapper_lr_r" v-model=career.company placeholder="회사명"></input>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: dept">
        <label class="garo_wrapper_lr_l">부서명:</label>
        <input class="garo_wrapper_lr_r" v-model=career.dept placeholder="부서명"></input>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: endDate">
        <label class="garo_wrapper_lr_l">퇴사일:</label>
        <input class="garo_wrapper_lr_r" v-model=career.endDate placeholder="퇴사일" type="month"></input>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: position">
        <label class="garo_wrapper_lr_l">직급/직책:</label>
        <input class="garo_wrapper_lr_r" v-model=career.position placeholder="직급/직책"></input>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: reason">
        <label class="garo_wrapper_lr_l">퇴사사유:</label>
        <input class="garo_wrapper_lr_r" v-model=career.reason placeholder="퇴사사유"></input>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: crrDesc">
        <label class="garo_wrapper_lr_l">담당업무:</label>
        <textarea class="garo_wrapper_lr_r" v-model=career.crrDesc placeholder="담당업무"></textarea>
      </div>
      <div class="garo_wrapper_r" style="grid-area: button">
        <CommonButton @click="{ handlerCreateCareerBtn({ resIdx: props.resume.resIdx, career: career }); career={ ...careerDefault } }">저장</CommonButton>
        <CommonButton @click="isAddCareer = false">취소</CommonButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import { useCareerListReadQuery } from "../../../../../hook/apply/resume/career/useCareerListReadQuery";
import { useCareerNewCreateMutation } from "../../../../../hook/apply/resume/career/useCareerNewCreateMutation";
import { useCareerNewDeleteMutation } from "../../../../../hook/apply/resume/career/useCareerNewDeleteMutation";

const props = defineProps(["resume", "isShow"]);
const emits = defineEmits(["isExistCareer"]);
const resIdx = ref("");
const careerDefault = { startDate: '', company: '', dept: '', endDate: '', position: '', reason: '', crrDesc: ''};
const career = ref({ ...careerDefault });
const isAddCareer = ref(false);
const isExistCareer = computed(() => careerList?.payload?.length >= 1 || false);

const { data: careerList } = useCareerListReadQuery(resIdx);
const { mutate: handlerCreateCareerBtn } = useCareerNewCreateMutation();
const { mutate: handlerDeleteCareerBtn } = useCareerNewDeleteMutation();

watch(() => [props.resume.resIdx, careerList?.payload], () => {
  resIdx.value = props.resume.resIdx;

  console.log('isExistCareer:', isExistCareer.value); // .value로 접근
  emits("isExistCareer", isExistCareer.value); // .value로 emit
});
</script>

<style></style>
