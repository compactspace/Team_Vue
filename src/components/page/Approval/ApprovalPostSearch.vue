<template>
  <div class="search-container">
    <div class="search-box">
      <span class="search-input">
        <b-form-input
          v-model="searchKey.searchTitle"
          v-on:keyup.enter="handlerSearch"
          size="sm"
        />
      </span>
      <span class="search-input calendar">
        <b-form-input
          type="date"
          size="sm"
          v-model="searchKey.searchStartDate"
        />
      </span>
      <span class="search-input calendar">
        <b-form-input type="date" size="sm" v-model="searchKey.searchEndDate" />
      </span>
      <span class="search-input">
        <b-button variant="primary" @click="handlerSearch">검색</b-button>
      </span>
    </div>
  </div>
</template>

<script setup>
const injectedValue = inject("providedValue");
const searchKey = ref({});

const handlerSearch = () => {
  injectedValue.value = { ...searchKey.value };
};
</script>

<style lang="scss" scoped>
.search-container {
  width: 100%;
  height: 20px;
}
.search-box {
  text-align: right;
  margin: 10px 0px;
  display: block;
  float: inline-end;
}
.search-input {
  float: left;
  margin: 0px 3px;
}
.calendar {
  width: 120px;
}
input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
input:hover {
  background-color: #ffffff;
}
button {
  margin: 0px 3px;
  width: 70px;
}
</style>
