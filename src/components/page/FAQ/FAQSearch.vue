<template>
  <div class="search-box">
    제목<input v-model.lazy="searchKey.searchTitle" />
    <input type="date" v-model="searchKey.searchStartDate" />
    <input type="date" v-model="searchKey.searchEndDate" />
    <button @click="FAQSearch">검색</button>
    <button v-if="userType === 'M'" @click="FAQInsert()">신규등록</button>
  </div>
</template>

<script setup>
import { useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { useUserInfo } from "../../../stores/userInfo";

const injectedValue = inject("providedValue");
const searchKey = ref({
  searchTitle: "",
  searchStartDate: "",
  searchEndDate: "",
});
const router = useRouter();
const queryClient = useQueryClient();
const userInfo = useUserInfo();
const userType = computed(() => userInfo.user.userType);

const FAQSearch = () => {
  injectedValue.value = { ...searchKey.value };
};

const FAQInsert = () => {
  queryClient.removeQueries({ queryKey: ["FAQDetailModal"] });
  searchKey.value = {
    searchTitle: "",
    searchStartDate: "",
    searchEndDate: "",
  };

  router.push("faqSavePart.do");
};
</script>

<style lang="scss" scoped>
.search-box {
  margin-bottom: 10px;
  display: block;
  float: inline-end;
}

input {
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
