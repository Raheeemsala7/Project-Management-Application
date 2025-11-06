"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { Input } from "./ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { registrationSchema, signInSchema, type RegistrationFormType, type SignInFormType } from "@/lib/zodSchema"
import { useSignUpMutation } from "@/hooks/use-auth"
import { toast } from "sonner"
import { useNavigate } from "react-router"




export function RegisterForm() {

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();


    const { mutateAsync, isPending } = useSignUpMutation()

    const form = useForm<RegistrationFormType>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    console.log(isPending)

    const onSubmit = async (data: RegistrationFormType) => {
        const { name, email, password } = data

        try {
            await mutateAsync({ name, email, password })
            toast.success("Email Verification Required", {
                description:
                    "Please check your email for a verification link. If you don't see it, please check your spam folder.",
            });

            form.reset();
            navigate("/login");
        } catch (error: any) {

            const errorMessage =
                error.response?.data?.message ? error.response?.data?.message :
                    error.response?.data[0].issues[0].message ?
                        error.response?.data[0].issues[0].message :
                        "An error occurred. Please try again.";
            toast.error(errorMessage);

        }
    }

    return (
        <>
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">تسجيل الدخول</h1>
                <p className="text-slate-400 text-sm">أدخل بيانات حسابك للدخول إلى حسابك</p>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-300 text-sm font-medium">Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter your name' className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 pr-10 focus:border-blue-500 focus:ring-blue-500" autoComplete={"off"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-300 text-sm font-medium">Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter your email' className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 pr-10 focus:border-blue-500 focus:ring-blue-500" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel className="text-slate-300 text-sm font-medium">Password</FormLabel>
                                <FormControl>
                                    <div className="relative flex items-center">
                                        <Lock className="absolute left-3 top-3 size-4 text-slate-500" />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your Password"
                                            autoComplete="new-password"
                                            className="pl-10 pr-10 bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                                        >
                                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <Button type="submit" className='w-full bg-[#384866] hover:bg-[#4d648f]' disabled={isPending}>
                        {isPending ?
                            <Loader2 className='size-4 animate-spin transition-all' />
                            :
                            ""
                        }
                        Sign In
                    </Button>


                    {/* Divider */}
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-800 text-slate-400">أو</span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-slate-900 border-slate-700 text-white hover:bg-slate-800"
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </Button>

                    {/* Sign Up Link */}
                    <p className="text-center text-slate-400 text-sm">
                        ليس لديك حساب؟{" "}
                        <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold">
                            إنشاء حساب
                        </a>
                    </p>
                </form>
            </Form>
        </>
    )
}
