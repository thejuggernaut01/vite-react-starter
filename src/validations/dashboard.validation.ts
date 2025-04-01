import { z } from 'zod';
import {
  DepositProps,
  ExternalTransferProps,
  InternalTransferProps,
  SwapProps,
} from '@/types/dashboard';

type DashboardType =
  | 'deposit'
  | 'internal-transfer'
  | 'external-transfer'
  | 'swap';

const depositSchema: z.ZodType<DepositProps> = z.object({
  token: z.string({ required_error: 'Coin type is required' }),
  network: z.string({ required_error: 'Network is required' }),
});

const internalTransferSchema: z.ZodType<InternalTransferProps> = z.object({
  receiverUserTag: z
    .string({
      required_error: 'Receiver user tag is required',
    })
    .min(1, 'Receiver user tag is required'),
  token: z.string({ required_error: 'Token is required' }),
  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .positive({ message: 'Amount must be greater than 0' }),
});

const externalTransferSchema: z.ZodType<ExternalTransferProps> = z.object({
  token: z.string({ required_error: 'Token is required' }),
  network: z.string({
    required_error: 'Network is required',
  }),
  address: z
    .string({
      required_error: 'Address is required',
    })
    .min(1, 'Address is required'),
  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .positive({ message: 'Amount must be greater than 0' }),
});

const SwapSchema: z.ZodType<SwapProps> = z.object({
  fromToken: z.string({ required_error: 'token is required' }),
  fromAmount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .positive({ message: 'Amount must be greater than 0' }),
  toToken: z.string({ required_error: 'token is required' }),
});

// Return schema based on form type
export const dashboardZodValidator = (dashboardType: DashboardType) => {
  if (dashboardType === 'deposit') {
    return depositSchema;
  }

  if (dashboardType === 'internal-transfer') {
    return internalTransferSchema;
  }

  if (dashboardType === 'external-transfer') {
    return externalTransferSchema;
  }

  if (dashboardType === 'swap') {
    return SwapSchema;
  }

  return;
};

export type DepositType = z.infer<typeof depositSchema>;
export type InternalTransferType = z.infer<typeof internalTransferSchema>;
export type ExternalTransferType = z.infer<typeof externalTransferSchema>;
export type SwapType = z.infer<typeof SwapSchema>;
