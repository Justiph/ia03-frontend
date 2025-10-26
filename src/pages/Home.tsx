// src/pages/Home.tsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center space-y-12">
      {/* Hero Section */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
          Welcome to AuthJustiph
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent leading-tight">
          Secure Authentication
          <br />
          <span className="text-brand-600 dark:text-brand-400">Made Simple</span>
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Get started with our modern authentication system. Create an account or sign in to access your dashboard.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link
          to="/signup"
          className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white text-2xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300">
              ✨
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              New User?
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Create a new account and start your journey with us. It's quick, easy, and completely free.
            </p>
            
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold group-hover:gap-3 transition-all duration-300">
              <span>Get Started</span>
              <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </div>
        </Link>

        <Link
          to="/login"
          className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300">
              🔐
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Already have an account?
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Welcome back! Sign in to your account and continue where you left off.
            </p>
            
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold group-hover:gap-3 transition-all duration-300">
              <span>Sign In</span>
              <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Features */}
      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl mx-auto">
            🚀
          </div>
          <h4 className="font-semibold text-slate-900 dark:text-white">Fast & Secure</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">Lightning-fast authentication with enterprise-grade security</p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 text-xl mx-auto">
            🎨
          </div>
          <h4 className="font-semibold text-slate-900 dark:text-white">Modern Design</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">Beautiful, responsive interface that works on any device</p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 text-xl mx-auto">
            💡
          </div>
          <h4 className="font-semibold text-slate-900 dark:text-white">Easy to Use</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">Intuitive user experience with clear navigation</p>
        </div>
      </div>
    </div>
  );
}
