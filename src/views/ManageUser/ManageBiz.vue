<template>
  <ContextBox>기업회원관리</ContextBox>
  <BizSearch />
  <BizMain />
</template>

<script setup>
import { provide } from "vue";

const providedValue = ref();

provide("providedValue", providedValue);
</script>
