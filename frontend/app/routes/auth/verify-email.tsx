import {  buttonVariants } from '@/components/ui/button';
import { useVerifyEmailMutation } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { CheckCircle, Loader, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { toast } from 'sonner';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);



    const { mutate, isPending: isVerifying } = useVerifyEmailMutation()
    useEffect(() => {
        if (token) {
            mutate(token, {
                onSuccess: () => {
                    setIsSuccess(true);
                    navigate("/login");
                    toast.success("Email verified successfully");
                },
                onError: (error: any) => {
                    setIsSuccess(false);

                    const errorMessage =
                        error.response?.data?.message || "An error occurred";

                    if (errorMessage.includes("already verified")) {
                        setIsAlreadyVerified(true);
                        toast.info("Email already verified");
                    } else {
                        toast.error(errorMessage);
                    }
                }
            })
        }
    }, [searchParams])


    return (
        <div className="flex flex-col items-center justify-center ">
            <h1 className="text-3xl font-bold text-white">Verify Email</h1>
            <p className="text-sm text-gray-500">Verifying your email...</p>


            <div>
                <div className="flex flex-col items-center justify-center py-6 ">
                    {isVerifying ? (
                        <>
                            <Loader className="w-10 h-10 text-gray-500 animate-spin" />
                            <h3 className="text-lg font-semibold">Verifying email...</h3>
                            <p className="text-sm text-gray-500">
                                Please wait while we verify your email.
                            </p>
                        </>
                    ) : isSuccess ? (
                        <>
                            <CheckCircle className="w-10 h-10 text-blue-500" />
                            <h3 className="text-lg font-semibold">Email Verified</h3>
                            <p className="text-sm text-gray-500">
                                Your email has been verified successfully.
                            </p>
                            <Link to="/login" className={cn(buttonVariants() , " mt-6")}>
                                Back to Sign in
                            </Link>
                        </>
                    ) :
                        isAlreadyVerified ? (
                            <>
                                <CheckCircle className="w-10 h-10 text-blue-500" />
                                <h3 className="text-lg font-semibold text-white">Email Already Verified</h3>
                                <p className="text-sm text-gray-500">
                                    This email address has already been verified.
                                </p>
                                <Link to="/login" className={cn(buttonVariants() , "w-full bg-[#384866] hover:bg-[#4d648f] mt-6")}>
                                    Back to Sign in
                                </Link>
                            </>
                        ) :
                            (
                                <>
                                    <XCircle className="w-14 h-14 text-destructive" />
                                    <h3 className="text-lg font-semibold text-destructive my-3">
                                        Email Verification Failed
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Your email verification failed. Please try again.
                                    </p>

                                    <Link to="/login" className={cn(buttonVariants({variant:"destructive"}) , "w-full mt-6")}>
                                        Back to Sign in
                                    </Link>
                                </>
                            )}
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail