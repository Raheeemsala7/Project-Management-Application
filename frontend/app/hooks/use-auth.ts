import { postData } from "@/lib/fetch-util";
import type { RegistrationFormType, SignInFormType } from "@/lib/zodSchema";
import { useMutation } from "@tanstack/react-query";



export const useSignUpMutation = () => {
    return useMutation({
        mutationFn: (data: RegistrationFormType) => postData("/auth/register", data),
    });
};
export const useSignInMutation = () => {
    return useMutation({
        mutationFn: (data: SignInFormType) => postData("/auth/login", data),
    });
};

export const useVerifyEmailMutation = () => {
    return useMutation({
        mutationFn: (token: string) => postData("/auth/verify-email", { token }),
    });
}