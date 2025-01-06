<!-- 일반페이지도 모달로 만들어주는 간편양식 -->
<template>
  <template v-if="modalStore.modalState">
    <teleport to="body">
      <div class="modal_overlay" @mousedown="modalStore.modalState = false">
        <div class="modal_content" @mousedown.stop="">
          <slot></slot>
        </div>
      </div>
    </teleport>
  </template>
</template>

<script setup>
import { useModalStore } from "../../stores/modalState";

const modalStore = useModalStore();
</script>

<style>
.modal_overlay {
  /* 모달 오버레이: 모달 주위 암막 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal_content {
  /* 모달 크기에 따른 모달 내부 컨텐츠 크기 조정 */
  width: 50%; /* 모달 너비 */
  max-height: 80%; /* 모달 최대 높이 */
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 800px rgba(0, 0, 0, 0.8);
  background: #fff; /* 모달 배경 */
  overflow-y: auto; /* 세로 스크롤 */
}
</style>
