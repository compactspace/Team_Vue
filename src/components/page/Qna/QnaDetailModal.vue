<template>
  <!-- 게시글 보기 모달이랑 유사하나 조건문으로 도배되니 그냥 따로 하다 더 만들자. -->
  <div class="modalWrapper">
    <div class="modalArea">
      <ContextBox>Qna등록</ContextBox>
      <div v-if="isLoading">기다려주세요</div>
      <div v-else>
        <label> 제목 :<input type="text" v-model="newQnaValue.qnaTit" /> </label>
        <label>
          <!-- <input type="hidden" v-model="" /> -->
          내용 :
          <input type="text" v-model="newQnaValue.qnaCon" />
        </label>
        파일 :<input type="file" style="display: none" id="fileInput" @change="fileChange" />
        <label class="img-label" htmlFor="fileInput"> 파일 첨부하기 </label>
        <div>
          <div v-if="imageUrl">
            <label>미리보기</label>
            <img :src="imageUrl" />
          </div>
          <div v-else>
            <label>파일명</label>
          </div>
          <label>
            비밀번호입력 :
            <input type="password" v-model="newQnaValue.password" />
          </label>
        </div>
        <div class="button-box">
          <button @click="qnaApplication">등록하기</button>
          <button v-if="params.idx" @click="handlerDeleteBtn">삭제</button>
          <button @click="$router.go(-1)">뒤로가기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { useUserInfo } from "../../../stores/userInfo";
import { useMyqQnaSaveDetailMutation } from "../../../hook/qna/useMyqQnaSaveDetailMutation";

const { params } = useRoute();
const newQnaValue = ref({});
const fileData = ref("");
const userInfo = useUserInfo();

const fullSaveData = ref({});

const fileChange = (e) => {
  const fileInfo = e.target.files;

  const fileInfoSplit = fileInfo[0].name.split(".");

  const fileExtension = fileInfoSplit[1].toLowerCase();
  if (
    fileExtension === "jpg" ||
    fileExtension === "gif" ||
    fileExtension === "png" ||
    fileExtension === "webp"
  ) {
    // imageUrl.value = URL.createObjectURL(fileInfo[0]);
  }

  fileData.value = fileInfo[0];

  //console.log(fileData.value);
};

const qnaApplication = async () => {
  const textData = {
    loginId: userInfo.user.loginId,
    qna_type: userInfo.user.userType,
    ...newQnaValue.value,
  };

  const formData = new FormData();
  formData.append("file", fileData.value);

  formData.append(
    "text",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    })
  );

  fullSaveData.value = formData;

  //console.log(fullSaveData.value);
  //await axios.post("/prx/api/board/qnaSaveFileForm.do", formData);
  myQnaSave(fullSaveData);
};

const { mutate: myQnaSave } = useMyqQnaSaveDetailMutation(fullSaveData);
</script>

<style lang="scss" scoped>
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

.modalWrapper {
  background: #ccc;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 80%;
}

.modalArea {
  height: 50%;
  box-shadow: 0px 0px 20px black;
}

label {
  display: flex;
  flex-direction: column;
}

input[type="text"] {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 400px;
}

img {
  width: 100px;
  height: 100px;
}

.img-label {
  margin-top: 10px;
  padding: 6px 25px;
  background-color: #3bb2ea;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.9);
  cursor: pointer;

  &:hover {
    background-color: #45a049;
    color: white;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}

.button-box {
  text-align: right;
  margin-top: 10px;
}
button {
  background-color: #3bb2ea;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: right;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px #999;
  transition: 0.3s;

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
