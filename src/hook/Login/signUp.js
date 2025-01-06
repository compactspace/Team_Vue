import { useMutation } from "@tanstack/vue-query";
import { signUpApi } from "../../api/login/signUpApi";

export const signUp = (useUserInfo) => {
    return useMutation({
    mutationFn: () => signUpApi(useUserInfo),
    });
};
