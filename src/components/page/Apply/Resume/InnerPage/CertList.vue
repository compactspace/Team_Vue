<template>
  <p v-if="props.isShow" class="resumeDetail_guidetext">
    • 직무 관련 자격증, 외국어 자격증이나 수료한 교육 등이 있다면 간략히 작성해주세요. <br />
    • 지원하는 회사에서 요구하는 경우가 아니라면 운전면허증과 같은 자격증은 생략하는 것이 좋습니다!
  </p>
  <template v-for="(item, key) in certList?.payload" :key="key">
    <div class="cert_table">
      <div class="garo_wrapper_lr" style="grid-area: acqDate">
        <label class="garo_wrapper_lr_l">취득일:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.acqDate.slice(0, 7)" placeholder="취득일" type="month" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: certName">
        <label class="garo_wrapper_lr_l">자격증명:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.certName" placeholder="자격증명" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: grade">
        <label class="garo_wrapper_lr_l">등급:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.grade" placeholder="등급" disabled />
      </div>
      <div class="garo_wrapper_lr" style="grid-area: issuer">
        <label class="garo_wrapper_lr_l">발행처:</label>
        <textarea class="garo_wrapper_lr_r" :value="item.issuer" placeholder="발행처" disabled />
      </div>
      <div class="garo_wrapper_r" style="grid-area: button">
        <CommonButton @click="handlerDeleteCertBtn({ resIdx: props.resume.resIdx, certIdx: item.certIdx })" v-if="props.isShow">삭제</CommonButton>
      </div>
    </div>
  </template>
  <button class="add_btn" @click="isAddCert = !isAddCert" style="border-radius: 5px; margin-bottom: 10px;" v-if="props.isShow">+ 추가</button>
  <div>
    <div class="cert_table" v-if="isAddCert && props.isShow">
      <div class="garo_wrapper_lr" style="grid-area: acqDate">
        <label class="garo_wrapper_lr_l">취득일:</label>
        <input class="garo_wrapper_lr_r" v-model=cert.acqDate placeholder="취득일" type="month"></input>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: certName">
        <label class="garo_wrapper_lr_l">자격증명:</label>
        <input class="garo_wrapper_lr_r" v-model=cert.certName placeholder="자격증명"></input>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: grade">
        <label class="garo_wrapper_lr_l">등급:</label>
        <input class="garo_wrapper_lr_r" v-model=cert.grade placeholder="등급"></input>
      </div>
      <div class="garo_wrapper_lr" style="grid-area: issuer">
        <label class="garo_wrapper_lr_l">발행처:</label>
        <input class="garo_wrapper_lr_r" v-model=cert.issuer placeholder="발행처"></input>
      </div>
      <div class="garo_wrapper_r" style="grid-area: button">
        <CommonButton @click="{ handlerCreateCertBtn({ resIdx: props.resume.resIdx, cert: cert }); cert={ ...certDefault } }">저장</CommonButton>
        <CommonButton @click="isAddCert = false">취소</CommonButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import { useCertListReadQuery } from "../../../../../hook/apply/resume/cert/useCertListReadQuery";
import { useCertNewCreateMutation } from "../../../../../hook/apply/resume/cert/useCertNewCreateMutation";
import { useCertNewDeleteMutation } from "../../../../../hook/apply/resume/cert/useCertNewDeleteMutation";

const props = defineProps(["resume", "isShow"]);
const emits = defineEmits(["isExistCert"]);
const resIdx = ref("");
const certDefault = { acqDate: '', certName: '', grade: '', issuer: ''};
const cert = ref({ ...certDefault });
const isAddCert = ref(false);

const { data: certList } = useCertListReadQuery(resIdx);
const { mutate: handlerCreateCertBtn } = useCertNewCreateMutation();
const { mutate: handlerDeleteCertBtn } = useCertNewDeleteMutation();

watch(() => [props.resume.resIdx, certList], () => {
  resIdx.value = props.resume.resIdx;
  if (certList.payload && certList.payload.length >= 1) emits("isExistCareer", true);
  else                                                  emits("isExistCareer", false);
})
</script>

<style></style>
