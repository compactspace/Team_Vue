<template>
  <div class="search-box">
    <select v-model="searchKey.period">
      <option value="all" selected>조회기간 전체</option>
      <option value="1week">지난 1주일</option>
      <option value="1month">지난 1개월</option>
      <option value="2month">지난 2개월</option>
      <option value="3month">지난 3개월</option>
      <option value="6month">지난 6개월</option>
      <option value="1year">지난 1년</option>
    </select>
    <select v-model="searchKey.viewStatus">
      <option value="all" selected>열람여부 전체</option>
      <option value="1">열람</option>
      <option value="0">미열람</option>
    </select>
    <select v-model="searchKey.sortOrder">
      <option value="desc" selected>최근지원순</option>
      <option value="asc">과거지원순</option>
    </select>
    <input
      v-model.lazy="searchKey.keyWord"
      placeholder="공고/기업/이력서 명 통합 검색"
      @keyup.enter="handlerSearchKewordBtn('search')"
    />
    <CommonButton @click="handlerSearchKewordBtn('search')">검색</CommonButton>
    <CommonButton @click="handlerSearchKewordBtn('reset')">초기화</CommonButton>
  </div>
</template>

<script setup>
const searchKeyDefault = {
  period: "all",
  viewStatus: "all",
  sortOrder: "desc",
  keyWord: "",
  currentPage: 1,
};
const searchKey = ref({ ...searchKeyDefault });
const injectedHistorySearchValue = inject("providedHistorySearchValue");

const handlerSearchKewordBtn = (whatBtn) => {
  if (whatBtn == "reset") searchKey.value = { ...searchKeyDefault };
  injectedHistorySearchValue.value = { ...searchKey.value, currentPage: 1 };
};
</script>

<style lang="scss" scoped>
.search-box {
  margin-bottom: 10px;
  display: block;
  float: inline-end;
}

input,
select {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
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
