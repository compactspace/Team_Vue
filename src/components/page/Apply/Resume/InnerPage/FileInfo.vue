<template>
  <p v-if="props.isShow" class="resumeDetail_guidetext">
    • 포트폴리오, 경력기술서 등 첨부파일이 있다면 등록해주세요.<br />
  </p>
  <div>
    <div v-if="(isEditor && isPreview && isPrint && !fileData && !resume.logicalPath">
      <label htmlFor="fileInput" style="flex: 0 0 30px">파일 첨부</label>
      <input id="fileInput" type="file" @change="handlerSelectFileBtn" style="margin-bottom: 20px; border: 0px;"></input>
    </div>
    <div v-if="(fileData || resume.logicalPath)" class="garo_wrapper_lr">
      <label style="flex: 1">파일명: {{ fileData?.name || resume.fileName }}</label>
      <CommonButton v-if="props.isShow" @click="{ handlerDeleteFileBtn(); fileData=null; fileImgSrc=null; resume.logicalPath=''; }">파일 삭제</CommonButton>
    </div>
    <p style="margin: 5px" />
    <div v-if="fileImgSrc || ['jpg', 'jpeg', 'png', 'bmp', 'webp', 'gif'].includes(resume.fileExt?.toLowerCase())">
      <a :href="fileImgSrc || resume.logicalPath" :download="fileData?.name || resume.fileName">
        <img :src="fileImgSrc || resume.logicalPath" class="resume_img" style="width: 100%"/>
      </a>
    </div>
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import { useResumeFileDeleteMutation } from "../../../../../hook/apply/resume/useResumeFileDeleteMutation";
import { useResumeFileSelectMutation } from "../../../../../hook/apply/resume/useResumeFileSelectMutation";

const props = defineProps(["resume", "isShow"]);
const emits = defineEmits(["fileChange"]);
const resIdx = ref("");
const fileData = ref("");
const fileImgSrc = ref("");

const { mutate: handlerSelectFileBtn } = useResumeFileSelectMutation(fileData, fileImgSrc);
const { mutate: handlerDeleteFileBtn } = useResumeFileDeleteMutation(resIdx);

watch(() => [props.resume.resIdx, fileData], () => {
  resIdx.value = props.resume.resIdx;
  emits('fileChange', fileData);
})
</script>

<style></style>
