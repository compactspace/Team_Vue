import axios from "axios";
import { Login } from "../api";
import { toast } from "@/common/toastMessage";
import { useModalStore } from "@/stores/modalState";

export const signUpApi = async (useUserInfo) => {
    const modalStore = useModalStore();
    const result = await axios.post(Login.SignUp, useUserInfo.value);

    if(result.data.result === "SUCCESS"){
        toast.success("회원 가입 성공");
    } else {
        toast.error("회원 가입 실패");
    }
    modalStore.setModalState();

    return result.data;
};
