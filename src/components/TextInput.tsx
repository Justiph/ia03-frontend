// src/components/TextInput.tsx
import { useState, type InputHTMLAttributes, type ReactNode } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  left?: ReactNode;
  right?: ReactNode;
};

export default function TextInput({ label, error, hint, type, left, right, ...rest }: Props) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  const currentType = isPassword ? (show ? 'text' : 'password') : type;

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>

      <div
        className={[
          'relative group',
          error ? 'focus-within:ring-red-500 focus-within:border-red-500' : 'focus-within:ring-blue-500 focus-within:border-blue-500',
        ].join(' ')}
      >
        {!!left && <div className="absolute inset-y-0 left-3 grid place-items-center text-slate-400 pointer-events-none">{left}</div>}

        <input
          type={currentType}
          className={[
            'w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition-colors',
            'focus:ring-2',
            error ? 'border-red-300' : 'border-slate-300',
            left ? 'pl-10' : '',
            isPassword ? 'pr-20' : right ? 'pr-10' : '',
          ].join(' ')}
          aria-invalid={!!error}
          aria-describedby={error ? `${rest.name}-error` : hint ? `${rest.name}-hint` : undefined}
          {...rest}
        />

        {right && <div className="absolute inset-y-0 right-3 grid place-items-center text-slate-400">{right}</div>}

        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 my-1 px-2 text-xs rounded-md text-slate-600 hover:bg-slate-100"
            onClick={() => setShow((v) => !v)}
            tabIndex={-1}
          >
            {show ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      {hint && !error && (
        <p id={`${rest.name}-hint`} className="mt-1 text-xs text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${rest.name}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
