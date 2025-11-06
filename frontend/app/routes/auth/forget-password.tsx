import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForgotPasswordMutation } from '@/hooks/use-auth'
import { forgotPasswordSchema, type ForgotPasswordFormType } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'

const forgetPassword = () => {

    const form = useForm<ForgotPasswordFormType>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const { mutateAsync, isPending } = useForgotPasswordMutation()


    const onSubmit = async (data: ForgotPasswordFormType) => {
        const { email } = data
        try {
            await mutateAsync(email)
            toast.success("Reset link sent to your email. Please check your inbox.")
            form.reset()
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
            <div className='text-center space-y-2'>
                <h4 className='text-3xl text-white font-bold'>Forget Password</h4>
                <p className='text-slate-300'>Enter your email to reset your password</p>
            </div>
            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-6'>
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


                    <Button type="submit" className='w-full'
                        disabled={isPending}
                    >
                        {isPending ?
                            <Loader2 className='size-4 animate-spin transition-all' />
                            :
                            ""
                        }
                        Send Reset Link
                    </Button>
                    <p className='text-sm text-slate-300 text-center'>Remembered your password? <Link to="/login" className='text-blue-500'>Sign In</Link></p>
                </form>
            </Form>
        </>
    )
}

export default forgetPassword