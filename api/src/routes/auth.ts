
import express from 'express'
import { loginUser, registerUser, verifyEmail } from '../controllers/auth-controller'
import { loginSchema, registerSchema, verifyEmailSchema } from '../utils/validate-schema'
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


export default router