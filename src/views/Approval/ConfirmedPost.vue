<template>
  <ContextBox>공고 보기</ContextBox>
  <ApprovalPostSearch />
  <ConfirmedPostMain />
</template>

<script setup>
const providedValue = ref();
provide("providedValue", providedValue);
</script>
