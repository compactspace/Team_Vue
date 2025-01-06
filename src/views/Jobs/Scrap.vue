<template>
  <ContextBox>스크랩</ContextBox>
  <ScrapSearch />
  <ScrapMain />
</template>

<script setup>
const providedValue = ref();
provide("providedValue", providedValue);
</script>
