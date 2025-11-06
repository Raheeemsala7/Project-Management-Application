
import express from 'express'
import { loginUser, registerUser, resetPasswordRequest, verifyEmail, verifyResetPasswordTokenAndResetPassword } from '../controllers/auth-controller'
import { emailSchema, loginSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from '../utils/validate-schema'
import { validateRequest } from 'zod-express-middleware'

const router = express()


router.post("/register",
    validateRequest({
        body: registerSchema,
    }), registerUser)
router.post("/verify-email",
    validateRequest({
        body: verifyEmailSchema,
    }), verifyEmail)
router.post("/login", validateRequest({
    body: loginSchema,
}),loginUser)
router.post("/forgot-password", validateRequest({
    body: emailSchema,
}),resetPasswordRequest)
router.post("/reset-password", validateRequest({
    body: resetPasswordSchema,
}),verifyResetPasswordTokenAndResetPassword)


export default router