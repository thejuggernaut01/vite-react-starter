import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export type BadgeVariants = {
  variant: {
    default: string;
    secondary: string;
    destructive: string;
    outline: string;
    pending: string;
    live: string;
    completed: string;
  };
};

const badgeVariants = cva<BadgeVariants>(
  'inline-flex items-center rounded-full border px-4 py-1.5 text-xs  transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          ' bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        pending: 'bg-[#FEF6E7] text-[#C57D00] hover:bg-[#FEF6E7]/80',
        live: 'bg-[#F2FFF7] text-[#0E7B33] hover:bg-[#F2FFF7]/80',
        completed: 'bg-[#E9F5FF] text-[#229EFF] hover:bg-[#E9F5FF]/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
