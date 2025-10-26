// src/pages/SignUp.tsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Notice from '../components/Notice';
import { useRegister } from '../api/user';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const mutation = useRegister();

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            ✨
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create an account</h1>
          <p className="text-slate-600 dark:text-slate-400">It's quick and completely free</p>
        </div>

        {mutation.isSuccess && <Notice type="success" message={mutation.data.message} />}
        {mutation.isError && (
          <Notice
            type="error"
            message={mutation?.error?.response?.data?.message ?? 'Registration failed'}
          />
        )}

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
            placeholder="At least 6 characters"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            loading={isSubmitting || mutation.isPending}
            className="w-full py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {mutation.isPending ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-center text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
