<template>
  <p class="resumeDetail_guidetext" v-if="props.isShow">
    • 본인의 업무 경험을 기반으로 핵심역량과 업무 스킬을 간단히 작성해주세요.<br />
    • 3~5줄로 요약하여 작성하는 것을 추천합니다!
  </p>
  <textarea
    v-if="props.isShow || props.resume.shortIntro"
    :disabled="!props.isShow"
    placeholder="간단소개글을 입력해 주세요."
    v-model="props.resume.shortIntro"
  ></textarea>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";

const props = defineProps(["resume", "isShow"]);
</script>

<style></style>
