<template>
  <p class="resumeDetail_guidetext" v-if="props.isShow">
    • 지원동기, 직무역량, 직무관련 성과와 경험, 포부 등 자유롭게 작성해 주세요.
  </p>
  <textarea
    v-if="props.isShow || props.resume.perStatement"
    :disabled="!props.isShow"
    placeholder="자기소개서를 입력해 주세요."
    v-model="props.resume.perStatement"
  ></textarea>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";

const props = defineProps(["resume", "isShow"]);
</script>

<style></style>
