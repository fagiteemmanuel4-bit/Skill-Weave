import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Lock,
  Mail,
  Github,
  CheckCircle2,
  LogOut,
  User,
  Building,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, isAuthenticated, login, logout } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup' | 'sso'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, name || undefined);
  };

  const handleDemoSignIn = () => {
    login('alex.vance@skillweave.io', 'Alex Vance');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-brand-950/30 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold shadow-brand border border-brand-400/30">
              <span className="text-lg">SW</span>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">
                {isAuthenticated ? 'Account Profile' : mode === 'signin' ? 'Sign In to SkillWeave' : mode === 'signup' ? 'Create Free Account' : 'Enterprise SSO'}
              </h2>
              <p className="text-xs text-slate-400">
                {isAuthenticated ? 'Manage workspace & API tokens' : 'Access cloud sync & private skill registries'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {isAuthenticated && user ? (
            /* Logged In Profile State */
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-xl object-cover border border-slate-700 shadow-md" />
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <span>{user.name}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-brand-500/20 text-brand-300 rounded border border-brand-500/30">
                      Verified
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300 font-mono">{user.email}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Building className="w-3 h-3 text-slate-500" />
                    <span>{user.role} • {user.organization}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 font-medium">Session Status</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Active Local-First Session
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300 pt-1 border-t border-slate-800/80">
                  <span className="text-slate-400 font-medium">Member Since</span>
                  <span className="font-mono text-slate-300">{new Date(user.joinedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={logout}
                  className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Workspace</span>
                </button>
              </div>
            </div>
          ) : (
            /* Logged Out Login Form */
            <div className="space-y-5">

              {/* Mode Tabs */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setMode('signin')}
                  className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
                    mode === 'signin' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
                    mode === 'signup' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Register
                </button>
                <button
                  onClick={() => setMode('sso')}
                  className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
                    mode === 'sso' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  SSO
                </button>
              </div>

              {/* One-click Demo Button */}
              <button
                onClick={handleDemoSignIn}
                className="w-full py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-extrabold rounded-xl shadow-brand transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Instant Demo Login as Alex Vance</span>
              </button>

              <div className="relative text-center my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800" />
                </div>
                <span className="relative bg-slate-900 px-3 text-[11px] text-slate-500 font-semibold uppercase">
                  or sign in with email
                </span>
              </div>

              {/* Form inputs */}
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                {mode === 'signup' && (
                  <div>
                    <label className="text-slate-300 block mb-1 font-semibold">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Vance"
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl pl-9 pr-3 py-2 focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Work Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@acme.io"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl pl-9 pr-3 py-2 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl pl-9 pr-3 py-2 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>{mode === 'signin' ? 'Sign In to Dashboard' : mode === 'signup' ? 'Create Account' : 'Authenticate SSO'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* OAuth buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => login('dev.github@skillweave.io', 'GitHub Developer')}
                  className="py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub OAuth</span>
                </button>

                <button
                  onClick={() => login('dev.google@skillweave.io', 'Google Developer')}
                  className="py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-brand-400" />
                  <span>Google Workspace</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-[11px] text-slate-400">
          <span>Protected by SkillWeave 3-Dimension Security Protocol</span>
        </div>

      </div>
    </div>
  );
};
