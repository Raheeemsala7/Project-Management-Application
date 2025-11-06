import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useResetPasswordMutation } from '@/hooks/use-auth'
import { resetPasswordSchema, type ResetPasswordFormType } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'

const resetPassword = () => {

    const form = useForm<ResetPasswordFormType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { mutateAsync, isPending } = useResetPasswordMutation()
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const navigate = useNavigate()

    const onSubmit = async (data: ResetPasswordFormType) => {
        const { confirmPassword, newPassword } = data
        try {
            if (!token) {
                toast.error("Invalid token");
                return;
            }
            await mutateAsync({ token, newPassword, confirmPassword })
            toast.success("Password reset successfully")
            navigate("/login")
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                error.response?.data?.[0]?.issues?.[0]?.message ||
                "An error occurred. Please try again";
            toast.error(message);
        }
    }
    return (
        <>
            <div className='text-center space-y-2 mb-4'>
                <h4 className='text-3xl text-white font-bold'>Reset Password</h4>
                <p className='text-slate-300 text-sm'>Enter your password</p>
            </div>
            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel className="text-slate-300 text-sm font-medium">New Password</FormLabel>
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
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel className="text-slate-300 text-sm font-medium">Confirm Password</FormLabel>
                                <FormControl>
                                    <div className="relative flex items-center">
                                        <Lock className="absolute left-3 top-3 size-4 text-slate-500" />
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Enter your Password"
                                            autoComplete="new-password"
                                            className="pl-10 pr-10 bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                                        >
                                            {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button type="submit" className='w-full'
                        disabled={isPending}
                    >
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

export default resetPassword