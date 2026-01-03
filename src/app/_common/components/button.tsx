import React from 'react';
import { cx } from 'class-variance-authority';

// Tipos para las variantes
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';

// Variantes del botón
const buttonVariants: Record<'variant' | 'size', Record<string, string>> = {
  variant: {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    destructive:
      'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-200 dark:focus-visible:ring-red-900 dark:bg-red-600',
    outline:
      'border border-gray-300 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800',
    link: 'text-blue-600 underline-offset-4 hover:underline',
  },
  size: {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md gap-1.5 px-3',
    lg: 'h-10 rounded-md px-6',
    icon: 'w-9 h-9',
    'icon-sm': 'w-8 h-8',
    'icon-lg': 'w-10 h-10',
  },
};

// Props del componente Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';

    const variantClass = buttonVariants.variant[variant] || buttonVariants.variant.default;
    const sizeClass = buttonVariants.size[size] || buttonVariants.size.default;

    return (
      <button ref={ref} className={cx(className, baseClasses, variantClass, sizeClass)} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
