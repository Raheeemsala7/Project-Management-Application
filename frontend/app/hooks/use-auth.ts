import { postData } from "@/lib/fetch-util";
import type { RegistrationFormType, ResetPasswordFormType, SignInFormType } from "@/lib/zodSchema";
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
export const useForgotPasswordMutation = () => {
    return useMutation({
        mutationFn: (email: string) => postData("/auth/forgot-password", { email }),
    });
}

export const useResetPasswordMutation = () => {
    return useMutation({
        mutationFn: (data: {
            token: string;
            newPassword: string;
            confirmPassword: string;
        }) => postData("/auth/reset-password",  data ),
    });

}