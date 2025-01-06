import { onMounted, onUnmounted } from "vue";

// 엔터키가 눌렸을때 콜백 함수를 실행
export function handlerEnterKey(callback) {
  const onKeyUp = (event) => {
    if (event.key === "Enter") {
      callback();
    }
  };

  onMounted(() => {
    window.addEventListener("keyup", onKeyUp);
  });
  onUnmounted(() => {
    window.removeEventListener("keyup", onKeyUp);
  });
}
