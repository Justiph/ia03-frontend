// src/pages/Login.tsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Notice from '../components/Notice';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormData = z.infer<typeof schema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const navigate = useNavigate();

  const onSubmit = async (_: FormData) => {
    // Simulate login
    await new Promise((r) => setTimeout(r, 700));
    // toggle to 'error' to simulate bad creds:
    setStatus('ok');
  };

  useEffect(() => {
    if (status === 'ok') {
      const t = setTimeout(() => navigate('/'), 700);
      return () => clearTimeout(t);
    }
  }, [status, navigate]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            🔐
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h1>
          <p className="text-slate-600 dark:text-slate-400">Sign in to your account to continue</p>
        </div>

        {status === 'ok' && <Notice type="success" message="Logged in. Redirecting…" />}
        {status === 'error' && <Notice type="error" message="Invalid email or password." />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <TextInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
            error={errors.email?.message}
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Your password"
            {...register('password')}
            error={errors.password?.message}
            hint="Minimum 6 characters"
          />

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 text-brand-600 focus:ring-brand-500" /> 
              Remember me
            </label>
            <Link to="#" className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium transition-colors">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" loading={isSubmitting} className="w-full py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-center text-slate-600 dark:text-slate-400">
            New here?{' '}
            <Link to="/signup" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-semibold transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
