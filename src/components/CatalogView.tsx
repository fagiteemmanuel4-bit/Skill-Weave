import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SkillCard } from './SkillCard';
import { BundleCard } from './BundleCard';
import { AgentTarget, RiskTier } from '../types';
import {
  Filter,
  Search,
  Workflow,
  Layers,
  X,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  Zap,
  HelpCircle
} from 'lucide-react';

export const CatalogView: React.FC = () => {
  const {
    skills,
    bundles,
    searchQuery,
    setSearchQuery,
    selectedAgent,
    setSelectedAgent,
    selectedCategory,
    setSelectedCategory,
    selectedRiskTier,
    setSelectedRiskTier,
    clearFilters,
    setActiveTab
  } = useApp();

  const [viewMode, setViewMode] = useState<'bundles' | 'skills'>('bundles');

  // Available agent options
  const agentOptions: { id: AgentTarget | 'all'; label: string }[] = [
    { id: 'all', label: 'All Agents' },
    { id: 'claude-desktop', label: 'Claude Desktop' },
    { id: 'cursor', label: 'Cursor' },
    { id: 'windsurf', label: 'Windsurf' },
    { id: 'openhands', label: 'OpenHands' },
    { id: 'cli', label: 'CLI / Shell' }
  ];

  // Available categories
  const categories = ['all', ...Array.from(new Set([
    ...bundles.map(b => b.category),
    ...skills.map(s => s.category)
  ]))];

  // Filter logic for bundles
  const filteredBundles = bundles.filter(b => {
    const matchesSearch = searchQuery === '' ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.goal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesAgent = selectedAgent === 'all' || b.supportedAgents.includes(selectedAgent as AgentTarget);
    const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
    const matchesRisk = selectedRiskTier === 'all' || b.overallRiskTier === selectedRiskTier;

    return matchesSearch && matchesAgent && matchesCategory && matchesRisk;
  });

  // Filter logic for skills
  const filteredSkills = skills.filter(s => {
    const matchesSearch = searchQuery === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesAgent = selectedAgent === 'all' || s.supportedAgents.includes(selectedAgent as AgentTarget);
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesRisk = selectedRiskTier === 'all' || s.riskTier === selectedRiskTier;

    return matchesSearch && matchesAgent && matchesCategory && matchesRisk;
  });

  const hasActiveFilters = searchQuery !== '' || selectedAgent !== 'all' || selectedCategory !== 'all' || selectedRiskTier !== 'all';

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950 border border-slate-800 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Workflow Composition & Trust Platform</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Stop collecting prompts. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-300">
              Start shipping with tested AI workflows.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Discover compatible AI agent skill bundles with explicit provenance, tool permission matrices, reproducible outcome rubrics, and single-click multi-agent export manifests.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                setViewMode('bundles');
                setSearchQuery('cartoon');
              }}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/25 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Explore Cartoon Website Workflow</span>
            </button>

            <button
              onClick={() => setActiveTab('simulation')}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Run Interactive Simulation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Mode Switcher Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-800 pb-4">

          {/* Mode Switcher Buttons */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
            <button
              onClick={() => setViewMode('bundles')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'bundles'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Workflow Bundles ({filteredBundles.length})</span>
            </button>

            <button
              onClick={() => setViewMode('skills')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'skills'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Individual Skills ({filteredSkills.length})</span>
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by goal, task, skill name, or tag..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-lg pl-9 pr-8 py-1.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Faceted Filters Row */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold shrink-0">
            <Filter className="w-3.5 h-3.5 text-brand-400" />
            <span>Filters:</span>
          </div>

          {/* Agent Dropdown */}
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value as AgentTarget | 'all')}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 focus:border-brand-500 focus:outline-none"
          >
            {agentOptions.map(ag => (
              <option key={ag.id} value={ag.id}>{ag.label}</option>
            ))}
          </select>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 focus:border-brand-500 focus:outline-none capitalize"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>Category: {cat}</option>
            ))}
          </select>

          {/* Risk Tier Dropdown */}
          <select
            value={selectedRiskTier}
            onChange={(e) => setSelectedRiskTier(e.target.value as RiskTier | 'all')}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 focus:border-brand-500 focus:outline-none capitalize"
          >
            <option value="all">Risk Tier: All</option>
            <option value="low">Risk Tier: Low</option>
            <option value="medium">Risk Tier: Medium</option>
            <option value="high">Risk Tier: High</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1 ml-auto underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid Content Display */}
      {viewMode === 'bundles' ? (
        filteredBundles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBundles.map(bundle => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-4">
            <ShieldAlert className="w-10 h-10 text-amber-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Workflow Bundles Match Your Search</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Try clearing filters or switching to "Individual Skills" view mode to compose a custom workflow bundle.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg"
            >
              Reset All Filters
            </button>
          </div>
        )
      ) : (
        filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-4">
            <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Skills Found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No individual skills matched your current query or category filter.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg"
            >
              Reset All Filters
            </button>
          </div>
        )
      )}
    </div>
  );
};
