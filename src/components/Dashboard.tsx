import { useProfile } from '../api/user';

export default function Dashboard() {
  const { data: profile, isLoading, error } = useProfile();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error loading profile</div>;
  }

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
          👋
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome back!</h1>
        <p className="text-slate-600 dark:text-slate-400">{profile?.email}</p>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-100 dark:bg-slate-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Your Profile</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</dt>
              <dd className="mt-1 text-slate-900 dark:text-white">{profile?.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Member since</dt>
              <dd className="mt-1 text-slate-900 dark:text-white">
                {new Date(profile?.createdAt || '').toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}