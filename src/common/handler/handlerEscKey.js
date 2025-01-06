import { useModalStore } from "@/stores/modalState";
import { onMounted, onUnmounted } from "vue";

// ESC키로 모달창 닫기
export function handlerEscKey() {
  const modalStore = useModalStore();

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      modalStore.setModalState(false);
    }
  };
  onMounted(() => {
    window.addEventListener("keydown", onKeyDown);
  });
  onUnmounted(() => {
    window.removeEventListener("keydown", onKeyDown);
  });
}
