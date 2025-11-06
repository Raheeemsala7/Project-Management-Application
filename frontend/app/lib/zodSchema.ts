// Zod validation schema
import { z } from "zod"

export const registrationSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    email: z
        .string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
    // .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    // .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    // .regex(/(?=.*\d)/, 'Password must contain at least one number')
    // .regex(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character'),
});

// TypeScript type from Zod schema
export type RegistrationFormType = z.infer<typeof registrationSchema>;


export const signInSchema = z.object({
    email: z
        .string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
    // .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    // .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    // .regex(/(?=.*\d)/, 'Password must contain at least one number')
    // .regex(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character'),
});

// TypeScript type from Zod schema
export type SignInFormType = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
});

// TypeScript type from Zod schema
export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(8, "Password must be 8 characters"),
        confirmPassword: z.string().min(8, "Password must be 8 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;