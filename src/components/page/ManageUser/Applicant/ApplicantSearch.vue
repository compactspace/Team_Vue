<template>
  <div class="search-box">
    <span>회원명</span>
    <input v-model.lazy="searchKey.searchName" />
    <button @click="handlerSearch">검색</button>
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
div {
  display: flex;
  justify-content: end;
}
input {
  width: 10%;
}
span {
  padding-top: 8px;
  padding-bottom: 8px;
  margin: 4px 2px;
}

button {
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: none;
  color: white;
  width: 70px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px #999;
  background-color: #3bb2ea;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}
</style>
