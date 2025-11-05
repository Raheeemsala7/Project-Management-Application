import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { resetPasswordSchema, type ResetPasswordFormType } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const resetPassword = () => {

    const form = useForm<ResetPasswordFormType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (data: ResetPasswordFormType) => {
        const { email } = data
    }
    return (
        <>
            <div className='text-center'>
                <h4>Forget Password</h4>
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


                    <Button type="submit" className='w-full'
                    //  disabled={isPending}
                     >
                        {/* {isPending ?
                            <Loader2 className='size-4 animate-spin transition-all' />
                            :
                            ""
                        } */}
                        Sign In
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default resetPassword