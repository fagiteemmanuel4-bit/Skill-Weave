import React, { useState } from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import {
  Search,
  Workflow,
  ShieldCheck,
  PlayCircle,
  BookOpen,
  Layers,
  Github,
  Sparkles,
  CheckCircle2,
  Cpu,
  Settings,
  User,
  Menu,
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    user,
    isAuthenticated,
    setIsAuthModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'catalog', label: 'Skill Registry & Bundles', icon: <Layers className="w-4 h-4" /> },
    { id: 'composer', label: 'Workflow Composer', icon: <Workflow className="w-4 h-4" /> },
    { id: 'integration', label: 'Integrations', icon: <Cpu className="w-4 h-4" />, badge: 'Multi-Agent' },
    { id: 'simulation', label: 'Worked Simulation', icon: <PlayCircle className="w-4 h-4" />, badge: 'Demo' },
    { id: 'governance', label: 'Trust & Governance', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'docs', label: 'Documentation', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <header className="bg-slate-900/95 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-xl shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand logo & tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('catalog')}
              className="flex items-center gap-3 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-brand border border-brand-400/40 group-hover:scale-105 transition-transform">
                <span className="text-xl tracking-wider">SW</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-white tracking-tight group-hover:text-brand-300 transition-colors">
                    SkillWeave
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-500/15 text-brand-300 border border-brand-500/30 rounded-full flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-brand-400" />
                    v1.0 Release
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium hidden sm:block">
                  AI Agent Skill Workflow Marketplace & Composer
                </p>
              </div>
            </button>
          </div>

          {/* Quick Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'catalog') {
                    setActiveTab('catalog');
                  }
                }}
                placeholder="Search skills, workflows, agent targets, or tasks..."
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-brand-500 rounded-xl pl-10 pr-4 py-1.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* User Auth & Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-all shadow-sm"
              title="User Account & Session"
            >
              {isAuthenticated && user ? (
                <>
                  <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                  <span className="hidden sm:inline text-white font-semibold">{user.name}</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4 text-brand-400" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            <a
              href="https://github.com/fagiteemmanuel4-bit/Skill-Weave"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="View GitHub Repository"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <button
              onClick={() => setActiveTab('simulation')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white shadow-brand transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Run Simulation</span>
              <span className="sm:hidden">Demo</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white md:hidden rounded-lg bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Desktop View Switcher Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-brand-600/20 text-brand-300 border border-brand-500/50 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 text-[9px] uppercase tracking-wider font-extrabold bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-3 border-t border-slate-800 space-y-1 animate-fadeIn">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] uppercase font-mono font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}

      </div>
    </header>
  );
};
