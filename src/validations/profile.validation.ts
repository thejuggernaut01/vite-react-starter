import { UpdateTransactionPinProps } from '@/types/profile';
import { z } from 'zod';
import {
  ProfileDetailsProps,
  ChangePasswordProps,
  SetTransactionPinProps,
  TwoFAProps,
  VerifyTwoFAProps,
} from '@/types/profile';

type ProfileType =
  | 'profileDetails'
  | 'twoFA'
  | 'verifyTwoFA'
  | 'changePassword'
  | 'setTransactionPin'
  | 'updateTransactionPin';

const ProfileDetailsSchema: z.ZodType<ProfileDetailsProps> = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .regex(/^[A-Z][a-z]+$/, {
      message: 'First name must be in sentence case.',
    })
    .max(20, { message: 'First Name must be less than 20 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .regex(/^[A-Z][a-z]+$/, {
      message: 'Last name must be in sentence case',
    })
    .max(20, { message: 'Last Name must be less than 20 characters' }),

  email: z
    .string()
    .min(2, { message: 'Enter a valid email address' })
    .email({ message: 'Enter a valid email address' })
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Enter a valid email address',
    }),
  nationality: z
    .string({ required_error: 'Nationality field cannot be empty' })
    .min(2, { message: 'Nationality field cannot be empty' }),
});

const TwoFASchema: z.ZodType<TwoFAProps> = z.object({
  authenticatorApp: z.boolean().refine((value) => value === true, {
    message: 'Please select a means of authentication',
  }),
});

const VerifyTwoFASchema: z.ZodType<VerifyTwoFAProps> = z.object({
  code: z
    .string({
      required_error: 'Authentication code is required.',
      invalid_type_error: 'Authentication code must be a number.',
    })
    .min(6, { message: 'Authentication code cannot be less than 6-digit' })
    .max(6, { message: 'Authentication code cannot be greater than 6-digit' })
    .refine((value) => {
      const parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        throw new z.ZodError([]);
      }
      return parsedValue;
    }),
});

const ChangePasswordSchema: z.ZodType<ChangePasswordProps> = z
  .object({
    oldPassword: z.string().min(6, {
      message: 'Password must be longer than or equal to 6 characters.',
    }),

    newPassword: z.string().min(6, {
      message: 'Password must be longer than or equal to 6 characters.',
    }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "Please use a password that you haven't used before.",
    path: ['newPassword'],
  });

const SetTransactionPinSchema: z.ZodType<SetTransactionPinProps> = z
  .object({
    newPin: z
      .string({
        required_error: 'Pin is required',
        invalid_type_error: 'Pin must be a number.',
      })
      .min(4, { message: 'Pin cannot be less than 6-digit' })
      .max(4, { message: 'Pin cannot be greater than 6-digit' })
      .refine((value) => {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
          return;
        }
        return parsedValue;
      }),
    confirmNewPin: z
      .string({
        required_error: 'Pin is required',
        invalid_type_error: 'Pin must be a number.',
      })
      .min(4, { message: 'Pin cannot be less than 6-digit' })
      .max(4, { message: 'Pin cannot be greater than 6-digit' })
      .refine((value) => {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
          return;
        }
        return parsedValue;
      }),
  })
  .refine((data) => data.newPin === data.confirmNewPin, {
    message: 'Both pins must match.',
    path: ['confirmNewPin'],
  });

const UpdateTransactionPinSchema: z.ZodType<UpdateTransactionPinProps> = z
  .object({
    oldPin: z
      .string({
        required_error: 'Pin is required',
        invalid_type_error: 'Pin must be a number.',
      })
      .min(4, { message: 'Pin cannot be less than 4-digit' })
      .max(4, { message: 'Pin cannot be greater than 4-digit' })
      .refine((value) => {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
          return;
        }
        return parsedValue;
      }),
    newPin: z
      .string({
        required_error: 'Pin is required',
        invalid_type_error: 'Pin must be a number.',
      })
      .min(4, { message: 'Pin cannot be less than 4-digit' })
      .max(4, { message: 'Pin cannot be greater than 4-digit' })
      .refine((value) => {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
          return;
        }
        return parsedValue;
      }),
  })
  .refine((data) => data.oldPin !== data.newPin, {
    message: "Please use a pin that you haven't used before.",
    path: ['newPin'],
  });

export const profileZodValidator = (profileType: ProfileType) => {
  if (profileType === 'profileDetails') {
    return ProfileDetailsSchema;
  }

  if (profileType === 'twoFA') {
    return TwoFASchema;
  }

  if (profileType === 'verifyTwoFA') {
    return VerifyTwoFASchema;
  }

  if (profileType === 'changePassword') {
    return ChangePasswordSchema;
  }

  if (profileType === 'setTransactionPin') {
    return SetTransactionPinSchema;
  }

  if (profileType === 'updateTransactionPin') {
    return UpdateTransactionPinSchema;
  }
};

export type ProfileDetailsType = z.infer<typeof ProfileDetailsSchema>;
export type TwoFAType = z.infer<typeof TwoFASchema>;
export type VerifyTwoFAType = z.infer<typeof VerifyTwoFASchema>;
export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;
export type SetTransactionPinType = z.infer<typeof SetTransactionPinSchema>;
export type UpdateTransactionPinType = z.infer<
  typeof UpdateTransactionPinSchema
>;
