import React from 'react';
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
  CheckCircle2
} from 'lucide-react';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, searchQuery, setSearchQuery } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'catalog', label: 'Skill Registry & Bundles', icon: <Layers className="w-4 h-4" /> },
    { id: 'composer', label: 'Workflow Composer', icon: <Workflow className="w-4 h-4" /> },
    { id: 'simulation', label: 'Worked Simulation', icon: <PlayCircle className="w-4 h-4" />, badge: 'PRD Demo' },
    { id: 'governance', label: 'Trust & Governance', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'docs', label: 'Documentation', icon: <BookOpen className="w-4 h-4" /> }
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand logo & tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20 border border-brand-400/30">
              <span className="text-xl tracking-wider">SW</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white tracking-tight">SkillWeave</span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/30 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-brand-400" />
                  v1.0 Open Source
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                AI Agent Skill Workflow Marketplace & Composer
              </p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
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
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* External links / badges */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/fagiteemmanuel4-bit/Skill-Weave"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="View GitHub Repository"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <button
              onClick={() => setActiveTab('simulation')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-md shadow-brand-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Try Cartoon Brief Simulation</span>
              <span className="sm:hidden">Demo</span>
            </button>
          </div>

        </div>

        {/* View Switcher Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800 text-brand-400 border border-brand-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 text-[10px] uppercase tracking-wider font-bold bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
