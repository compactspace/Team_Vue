<template>
  <div class="sero_wrapper" style="box-shadow: 0 4px 8px skyblue">
    <div class="resumeDetail_header">{{ props.title }}</div>
    <div class="resumeDetail_border" />
    <div class="sero_wrapper">
      <!-- 이 아래 slot란에 자식요소가 입주 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";

const props = defineProps(["title"]);
</script>

<style></style>
