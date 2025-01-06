<template>
  <div class="align-center">
    <div
      class="wrapper"
      :style="{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 75px)',
        gap: '10px',
        width: width + 'px',
      }"
    >
      <template v-for="(item, key) in items" :key="key">
        <CommonOnOff
          :isActive="item.isActive"
          @changeActive="item.onChangeActive()"
          >{{ item.name }}</CommonOnOff
        >
      </template>
    </div>
    <div style="position: relative">
      <SnowAni v-if="items.snow.isActive" :snowConfig="snowConfig" />
      <SkinImage v-if="items.skin.isActive" :url="skinUrl" />
    </div>
    <div class="align-center">
      <MusicBox
        v-if="items.music.isActive"
        :url="musicUrl"
        :width="width"
        class="wrapper"
      />
      <LunchMenu
        v-show="items.lunch.isActive"
        :url="lunchUrl"
        :width="width"
        class="wrapper"
      />
    </div>
  </div>
</template>
/* lunch는 생성(웹 크롤링)때가 유지(이미지 게시)때보다 리소스가 많이 들기에 v-if
대신 v-show 사용 */

<script setup>
import { reactive, watch } from "vue";
import CommonOnOff from "../common/CommonOnOff.vue";
import LunchMenu from "./AddOnPack/LunchMenu.vue";
import MusicBox from "./AddOnPack/MusicBox.vue";
import SkinImage from "./AddOnPack/SkinImage.vue";
import SnowAni from "./AddOnPack/SnowAni.vue";

const items = reactive({
  snow: {
    name: "눈",
    isActive: false,
    onChangeActive() {
      this.isActive = !this.isActive;
    },
  },
  skin: {
    name: "배경",
    isActive: false,
    onChangeActive() {
      this.isActive = !this.isActive;
    },
  },
  music: {
    name: "음악",
    isActive: false,
    onChangeActive() {
      this.isActive = !this.isActive;
    },
  },
  lunch: {
    name: "점심",
    isActive: true,
    onChangeActive() {
      this.isActive = !this.isActive;
    },
  },
});

const skinUrlList = [
  // ON/OFF버튼 껐다켤때마다 watch()에서 List목록 중 랜덤하게 뽑힘
  ...Array(4).fill("@/assets/christmas.gif"), // Array().fill: 해당함목 뽑힐 확률 4배 증가
  "@/assets/bg.jpg",
  "@/assets/alone.png",
  "@/assets/harry.jpg",
  "@/assets/seol.jpg",
];
const skinUrl = ref("");
const musicUrlList = [
  "https://www.youtube.com/watch?v=tEm9EyEPMYM",
  "https://www.youtube.com/watch?v=a_80o2lDYec",
  "https://www.youtube.com/watch?v=EvWo0xDpQGU",
  "https://www.youtube.com/watch?v=6o_6PmjkoCM",
];
const musicUrl = ref("");
const lunchUrl = ref("https://pf.kakao.com/_QLvRn"); // 이츠푸드='https://pf.kakao.com/_QLvRn', 벽산더이룸푸드='https://pf.kakao.com/_xdLzxgG'
const width = ref(200);
const snowConfig = ref({
  numSnow: 100,
  minRadius: 1,
  maxRadius: 4,
  minSpeed: 5,
  maxSpeed: 10,
});

watch(
  () => [items.skin.isActive],
  () => {
    const skinRandomIndex = Math.floor(Math.random() * skinUrlList.length);
    skinUrl.value = skinUrlList[skinRandomIndex];
  }
);

watch(
  () => [items.music.isActive],
  () => {
    const musicRandomIndex = Math.floor(Math.random() * musicUrlList.length);
    musicUrl.value = musicUrlList[musicRandomIndex];
  }
);
</script>

<style scoped>
.align-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 20px;
  padding: 5px;
  max-width: 100%;
  background-color: #f4f0e1;
  border: 5px solid gold;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Arial", sans-serif;
}
</style>
