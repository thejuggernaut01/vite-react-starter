import { CreateStrategyProps, StrategyTopupProps } from '@/types/strategies';
import { z } from 'zod';

export const strategyDetailsSchema: z.ZodType<
  CreateStrategyProps['strategyDetails']
> = z.object({
  strategyName: z
    .string({ invalid_type_error: 'Strategy name must be a string' })
    .min(1, { message: 'Strategy name is required' }),
  tradeType: z.enum(['HODL', 'SPOT']),
  description: z.string().min(1, { message: 'Description is required.' }),
  profitSharePercentage: z.enum(['10', '20', '30', '40', '50']),
});

export const fundingSetupSchema: z.ZodType<
  CreateStrategyProps['fundingSetup']
> = z.object({
  baseCurrency: z
    .string({
      required_error: 'Base currency is required',
      invalid_type_error: 'Base currency must be a string',
    })
    .min(1, { message: 'Base currency is required' }),
  depositAmount: z
    .number({
      required_error: 'Deposit amount is required',
      invalid_type_error: 'Deposit amount must be a number',
    })
    .positive({ message: 'Deposit must be greater than 0' }),
  termsAndCondition: z
    .boolean({
      required_error: 'Terms and condition is required',
      invalid_type_error: 'Terms and condition must be a boolean',
    })
    .refine((value) => value === true, {
      message: 'Please accept the terms before proceeding',
    }),
});

export const createStrategySchema: z.ZodType<CreateStrategyProps> = z.object({
  strategyDetails: strategyDetailsSchema,
  fundingSetup: fundingSetupSchema,
});

export const strategyTopupSchema: z.ZodType<StrategyTopupProps> = z.object({
  depositAmount: z
    .number({
      required_error: 'Deposit amount is required',
      invalid_type_error: 'Deposit amount must be a number',
    })
    .positive({ message: 'Deposit must be greater than 0' }),
  terms: z
    .boolean({
      required_error: 'Terms and condition is required',
      invalid_type_error: 'Terms and condition must be a boolean',
    })
    .refine((value) => value === true, {
      message: 'Please accept the terms before proceeding',
    }),
});

export type CreateStrategyType = z.infer<typeof createStrategySchema>;
export type StrategyTopupType = z.infer<typeof strategyTopupSchema>;
