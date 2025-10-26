import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Link, Outlet, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function ThemeToggle() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      className="btn-ghost rounded-full px-3 py-2"
      onClick={() => setDark(v => !v)}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50">
        <nav className="border-b border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white group"
            >
              <span className="h-10 w-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white grid place-items-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">◎</span>
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">AuthJustiph</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <NavLink 
                to="/" 
                className="nav-link px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Home
              </NavLink>
              <NavLink 
                to="/login" 
                className="nav-link px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Login
              </NavLink>
              <Link 
                to="/signup" 
                className="btn-primary px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Sign Up
              </Link>
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-600 dark:text-slate-400">
            <p className="font-medium">© {new Date().getFullYear()} AuthJustiph. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">Privacy</a>
              <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">Terms</a>
              <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
