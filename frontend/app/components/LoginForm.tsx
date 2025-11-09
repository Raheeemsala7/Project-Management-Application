"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { Input } from "./ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { signInSchema, type SignInFormType, } from "@/lib/zodSchema"
import { useSignInMutation } from "@/hooks/use-auth"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { useAuthStore } from "@/store/auth-store"
import type { LoginResponse } from "@/types"




export function LoginForm() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)


    const form = useForm<SignInFormType>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const { mutateAsync, isPending } = useSignInMutation()
    const { setUser, login , isAuthenticated} = useAuthStore()
    console.log(isAuthenticated)


    const onSubmit = async (data: SignInFormType) => {
        const { email, password } = data

        try {
            const responseData =  await mutateAsync({ email, password }) as LoginResponse;
            console.log(data)
            
            console.log(responseData)
            toast.success("Login successful");
            login(responseData?.user)

            form.reset();
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
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">تسجيل الدخول</h1>
                <p className="text-slate-400 text-sm">أدخل بيانات حسابك للدخول إلى حسابك</p>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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

                    <Button type="submit" className='w-full' disabled={isPending}>
                        {isPending ?
                            <Loader2 className='size-4 animate-spin transition-all' />
                            :
                            ""
                        }
                        Sign In
                    </Button>
                </form>
            </Form>
        </>
    )
}
