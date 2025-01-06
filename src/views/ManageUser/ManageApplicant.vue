<template>
  <ContextBox>개인회원관리</ContextBox>
  <ApplicantSearch />
  <ApplicantMain />
</template>

<script setup>
import { provide } from "vue";

const providedValue = ref();

provide("providedValue", providedValue);
</script>
