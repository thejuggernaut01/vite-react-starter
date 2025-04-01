import { cn } from '@/lib/utils';

import { ReactNode } from 'react';

interface ModalProps {
  className?: string;
  children: ReactNode;
}

const Modal = ({ className, children }: ModalProps) => {
  return <div className={cn('bg-white rounded-md', className)}>{children}</div>;
};

export default Modal;

const Overlay = ({ className, children }: ModalProps) => {
  return (
    <main
      className={cn(
        'w-full fixed inset-0 z-10 flex items-center justify-center bg-opacity-25 backdrop-brightness-50',
        className
      )}
    >
      {children}
    </main>
  );
};

Modal.Overlay = Overlay;

// const Header = ({ className, children }: ModalProps) => {
//   return <div className={cn("h-[61.18px]", className)}>{children}</div>;
// };

// Modal.Header = Header;

// const Footer = ({ className, children }: ModalProps) => {
//   return <div className={cn("h-[70px]", className)}>{children}</div>;
// };

// Modal.Footer = Footer;
