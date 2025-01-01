<template>
  <div>
    <h1>회원 탈퇴</h1>
  </div>
  <div>
    <h5>
      사용하고 계신 아이디(세션ID)를 탈퇴할 경우 재사용 및 복구가 불가능합니다. 탈퇴 후
      회원정보 및 개인형 서비스 이용기록은 모두 삭제됩니다. 안내 사항을 모두 확인하였으며,
      이에 동의합니다.
    </h5>
    <button @click="confirmFnc">확인</button>
  </div>
  {{ statusCode }}
  <div v-if="confirm" class="confirmModalWrapper">
    <div class="confirmModal">
      <div class="modalHeader">비밀번호 확인</div>
      <div class="checkPassWordArea">
        <div>비밀번호 확인</div>
        <input v-model="password" />
      </div>
      <div class="btnArea">
        <button @click="WithdrawFnc">수정</button>
        <button @click="confirmFnc">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserInfo } from "../../../stores/userInfo";
import { watchEffect } from "vue";
import { useWithdrawMutation } from "../../../hook/Withdraw/useWithdrawMutation";

const loginId = useUserInfo().user.loginId;

const confirm = ref(false);

const password = ref("");

const confirmData = ref({
  loginId: loginId,
  password:password
});

//param1 password
//param2 loginId
const { mutate: WithdrawFnc, data: statusCode } = useWithdrawMutation(confirmData);

watchEffect(() => {
  

  if (statusCode.value?.result === "fail") {
    console.log(statusCode.value.result);
    alert("탈퇴를 위한 비밀번호 확인이 틀렸습니다.\n 다시한번 확인해주세요\n");
    return;
  }

  if (statusCode.value?.result === "success") {
    alert("회원탈퇴가 성공적으로 이루어 졌습니다. \n 이용해주셔서 감사합니다.");
    sessionStorage.setItem("userInfo", "");
    router.push("/");
  }
});

const confirmFnc = () => {
  // console.log(confirm.value)
  if (confirm.value) {
    confirm.value = false;
    return;
  }
  confirm.value = true;
};
</script>

<style>
h1,
h3 {
  margin: 0px 0px;
  padding: 0px 0px;
}
button {
  display: inline-block;
  color: #e5e5e5;
  background-color:  #2d75c7;

}




.confirmModalWrapper{
   position: fixed;
   background-color:#e5e5e5;
     top:0px;
    width: 100%;
    height: 100vh;
}

.modalHeader{
    background-color: #3e4463;
    height: 40px;
    color: #e5e5e5;
    font-weight: 600;
    font-size:30px ;
}

.confirmModal {
    width:50%;
  position: fixed;
  top: 50%;
  left: 60%;
  display: flex;
  flex-direction: column;
  border: 1px solid #666;

  /* 위아래 너비를 준 상태에서 가로 50%, 세로 50%를 이동시킬 수 있다 (= 한가운데 배치) */
  transform: translate(-50%, -50%);

  /* 위의 overlay 배경보다 한 단계 더 높게 배치 */
  z-index: 300;
  height: 180px;
  justify-content: space-between;
}
.checkPassWordArea {
  display: flex;
}

input {
  display: inline-block;
  width: 80%;
}

.btnArea {
  display: flex;
  justify-content: space-around;
}
</style>
