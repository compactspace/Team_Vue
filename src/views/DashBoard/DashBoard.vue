<template>
  <ul class="dashboard-ul">
    <li class="align-center">
      <button @click="isShowMenu = !isShowMenu"></button>
    </li>
    <li class="menu-bar" v-show="isShowMenu">
      <LeftManuBar></LeftManuBar>
      <div class="align-center">
        <AddOn class="add-on" />
      </div>
    </li>
    <li class="content">
      <keep-alive><router-view></router-view></keep-alive>
    </li>
  </ul>
</template>

<script setup>
import LeftManuBar from "../../components/layout/LeftManuBar.vue";

const isShowMenu = ref(true);

const updateMenuVisibility = () => {
  isShowMenu.value = window.innerWidth >= 900;
};

onMounted(() => {
  updateMenuVisibility(); // 초기화
  window.addEventListener("resize", updateMenuVisibility); // 리사이즈 이벤트 추가
});

onUnmounted(() => {
  window.removeEventListener("resize", updateMenuVisibility); // 이벤트 제거
});
</script>

<style scoped>
.dashboard-ul {
  list-style-type: none;
  display: flex;
  overflow: hidden;
}

.align-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  display: none;
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  background-color: transparent; /* 투명배경, 즉 배경을 부모배경으로 */
  background-image: url("@/assets/menu.png");
  background-size: cover;
  background-position: center;
  border: none;
}

.menu-bar {
  float: left;
}

.add-on {
  display: flex; /* 숨김해제 */
}

.content {
  float: left;
  padding-left: 50px;
  padding-right: 10%;
  width: 77%;
  flex: 1;
}

@media (max-width: 900px) {
  .dashboard-ul {
    margin: 5px;
    padding: 5px;
    flex-direction: column;
  }

  button {
    display: block; /* 숨김해제 */
  }

  .menu-bar {
    float: inline-start;
    opacity: 1;
  }

  .add-on {
    display: block;
  }

  .content {
    padding: 25px;
    width: 100%;
  }
}
</style>
