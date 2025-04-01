import {
  type RecoverPasswordProps,
  type LoginProps,
  type UpdatePasswordProps,
  type SignUpProps,
  VerificationCodeProps,
} from '@/types/auth';
import { z } from 'zod';

type FormType =
  | 'login'
  | 'signup'
  | 'recoverPassword'
  | 'updatePassword'
  | 'verification-code';

// Zod validation for sign up
const signUpSchema: z.ZodType<SignUpProps> = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .regex(/^[A-Z][a-z]+$/, {
      message: 'First name must be in sentence case.',
    })
    .max(20, { message: 'First Name must be less than 20 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .regex(/^[A-Z][a-z]+$/, {
      message: 'Last name must be in sentence case',
    })
    .max(20, { message: 'Last Name must be less than 20 characters' }),

  email: z
    .string()
    .min(2, { message: 'Enter a valid email' })
    .email({ message: 'Enter a valid email' })
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Enter a valid email',
    }),

  password: z.string().min(6, {
    message: 'Password must be longer than or equal to 6 characters.',
  }),
  terms: z.boolean().refine((value) => value === true, {
    message: 'Please accept the terms before proceeding',
  }),
});

// Zod validation for login
const loginSchema: z.ZodType<LoginProps> = z.object({
  email: z
    .string()
    .min(2, { message: 'Email is required' })
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Enter a valid email',
    })
    .email({ message: 'Invalid email address' }),
  trial_count: z.number(),
  password: z.string().min(6, {
    message: 'Password must be longer than or equal to 6 characters.',
  }),
});

// Zod validation for forgotPassword
const recoverPasswordSchema: z.ZodType<RecoverPasswordProps> = z.object({
  email: z
    .string()
    .min(2, { message: 'Email is required' })
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Enter a valid email',
    })
    .email({ message: 'Invalid email address' }),
});

// Zod validation for reset password
const updatePasswordSchema: z.ZodType<UpdatePasswordProps> = z.object({
  password: z.string().min(6, {
    message: 'Password must be longer than or equal to 6 characters.',
  }),
});

// Zod validation for verification email code
const verificationCodeSchema: z.ZodType<VerificationCodeProps> = z.object({
  verificationCode: z.string().max(4, {
    message: 'Verification code must not exceed 4-digits.',
  }),
});

// Return schema based on form type
export const authZodValidator = (formType: FormType) => {
  if (formType === 'signup') {
    return signUpSchema;
  }

  if (formType === 'login') {
    return loginSchema;
  }

  if (formType === 'recoverPassword') {
    return recoverPasswordSchema;
  }

  if (formType === 'updatePassword') {
    return updatePasswordSchema;
  }

  if (formType === 'verification-code') {
    return verificationCodeSchema;
  }

  return;
};

export type SignUpType = z.infer<typeof signUpSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type RecoverPasswordType = z.infer<typeof recoverPasswordSchema>;
export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>;
export type VerificationCodeType = z.infer<typeof verificationCodeSchema>;
