// src/components/Button.tsx
import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: 'primary' | 'ghost';
};

export default function Button({ className = '', loading, disabled, variant = 'primary', children, ...rest }: Props) {
  const base =
    'rounded-lg px-5 py-2.5 font-medium transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-1';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-300',
  } as const;

  return (
    <button
      className={`${base} ${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
}
