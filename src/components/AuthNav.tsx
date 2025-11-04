import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLogout, useProfile } from '../api/user';

export function AuthNav() {
  const { isLoggedIn } = useAuth();
  const logout = useLogout();
  const { data: profile } = useProfile();

  if (isLoggedIn) {
    return (
      <>
        <NavLink 
          to="/dashboard" 
          className="nav-link px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Dashboard
        </NavLink>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {profile?.email}
        </span>
        <button
          onClick={() => logout.mutate()}
          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <>
      <Link
        to="/login"
        className="nav-link px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        Login
      </Link>
      <Link
        to="/signup"
        className="btn-primary px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        Sign Up
      </Link>
    </>
  );
}