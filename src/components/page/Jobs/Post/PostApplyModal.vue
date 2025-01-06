<template>
  <teleport to="body">
    <div class="backdrop">
      <div class="container">
        <div class="title-header">
          <span class="top-btn">
            <b-button variant="primary" @click="handlerApply">
              입사지원
            </b-button>
            <b-button variant="secondary" @click="handlerModal">
              나가기
            </b-button>
          </span>
          <h5>{{ props.bizName }}</h5>
          <h1>{{ props.title }}</h1>
          <br />
          <hr />
          지원 가능한 이력서
        </div>

        <b-form-group>
          <template v-if="resumeList">
            <div v-for="resume in resumeList" :key="resume.resumeIdx">
              <div class="d-flex">
                <b-card
                  :class="{ 'selected-card': selected === resume.resumeIdx }"
                  @click="selectOption(resume.resumeIdx)"
                  class="m-2"
                  style="cursor: pointer; width: 100%"
                >
                  <b-card-text>
                    <h5>{{ resume.resumeTitle }}</h5>
                  </b-card-text>
                  <b-list-group flush style="font-weight: 400; font-size: 15px">
                    <b-list-group-item>
                      최근 업데이트:
                      <b-badge variant="light" style="font-size: 13px">
                        {{ resume.updatedDate }}
                      </b-badge>
                    </b-list-group-item>
                    <b-list-group-item>
                      {{ resume.userEmail }} <br />
                      {{ resume.userPhone }}
                    </b-list-group-item>
                  </b-list-group>
                </b-card>
              </div>
            </div>
          </template>
        </b-form-group>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import axios from "axios";
import { useModalStore } from "../../../../stores/modalState";
const resumeList = ref();

const emit = defineEmits(["postSuccess", "modalClose"]);
const props = defineProps(["postIdx", "title", "bizName"]);
const modalState = useModalStore();
const selected = ref();

const selectOption = (option) => {
  selected.value = option;
};

const handlerApply = async () => {
  if (!selected.value) {
    alert("이력서를 선택하세요.");
    return;
  }

  const params = {
    resumeIdx: selected.value,
    postIdx: props.postIdx,
  };
  await axios.post("/prx/api/jobs/saveApply.do", params).then((res) => {
    if (res.data.result === "fail") {
      alert(res.data.message);
    } else {
      alert("지원 완료되었습니다.");
      modalState.setModalState();
      emit("applySuccess");
    }
  });
};

const handlerModal = () => {
  modalState.setModalState();
};

const searchResumeList = async () => {
  await axios.post("/prx/api/jobs/applyUserResumeDetail.do", {}).then((res) => {
    resumeList.value = res.data.userResumeList;
  });
};

onMounted(() => {
  searchResumeList();
});
</script>

<style lang="scss" scoped>
.selected-card {
  border: 3px solid #46a676;
  // background-color: #399668;
}
.backdrop {
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  font-weight: bold;
}
input[type="text"] {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.title-header {
  padding: 30px 0px 10px 10px;
  position: sticky;
  top: 0;
  background-color: white;
  width: 100%;
  z-index: 10;
}
.container {
  background: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 800px;
  height: 800px;
  overflow-y: scroll;
  z-index: 999;
}
.top-btn {
  float: right;
}
button {
  margin: 3px;
}
.button-box {
  text-align: right;
  margin-top: 10px;
}
</style>
