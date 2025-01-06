<template>
  <p class="resumeDetail_guidetext" v-if="props.isShow">
    • 깃허브, 노션으로 작성한 포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면 작성해주세요.
  </p>
  <a 
    :href="
      props.resume.pfoLink?.startsWith('http') 
      ? props.resume.pfoLink 
      : 'https://' + props.resume.pfoLink
    "
    style="margin-bottom: 10px; font-size: 0.8vw;"
  >
    {{ props.resume.pfoLink }}
  </a>
  <input
    v-if="props.isShow || props.resume.pfoLink"
    :disabled="!props.isShow"
    placeholder="링크를 입력해 주세요." 
    v-model="props.resume.pfoLink" 
  ></input>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";

const props = defineProps(["resume", "isShow"]);
</script>

<style></style>
