<!-- AddOn컴포넌트에서 설정된 주소를 Spring서버에 보내 점심메뉴를 웹크롤링해오는 코드 -->
<template>
  <div :style="{ width: props.width }">
    <img
      v-if="imageUrl === 'loading'"
      src="../../../assets/utilcons/loading_circle.gif"
      alt="로딩 이미지"
      class="styled-image"
    />
    <img
      v-else-if="imageUrl === 'error'"
      src="../../../assets/utilcons/noImage.jpg"
      alt="빈 이미지"
      class="styled-image"
    />
    <img v-else :src="imageUrl" alt="오늘의 메뉴" class="styled-image" />
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const props = defineProps(["url", "width"]);
const imageUrl = ref("loading");

onMounted(async () => {
  const proxyURL = "/prx";
  const apiURL = "/dashboard/menu.do";
  const menuURL = props.url;
  const queryParam = `?menuURL=${menuURL}`;

  try {
    const response = await axios.get(`${proxyURL}${apiURL}${queryParam}`);
    imageUrl.value = `${proxyURL}${response.data.imageUrl}`;
  } catch (error) {
    imageUrl.value = "error";
  }
});
</script>

<style scoped>
.styled-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  border: 3px solid #d4af37;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  object-fit: cover;
}
</style>
