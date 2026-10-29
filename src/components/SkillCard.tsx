import React from 'react';
import { Skill, RiskTier, ReviewStatus } from '../types';
import { useApp } from '../context/AppContext';
import { Star, ShieldAlert, CheckCircle, Cpu, ShieldCheck } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const { setSelectedSkill } = useApp();

  const getStatusBadge = (status: ReviewStatus) => {
    switch (status) {
      case 'Maintainer verified':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Task-tested':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Static review':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Metadata checked':
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
  };

  const getRiskBadge = (risk: RiskTier) => {
    switch (risk) {
      case 'low':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'high':
      case 'critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-card group">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-[11px] font-bold text-brand-400 uppercase tracking-wider mb-1 block">
              {skill.category}
            </span>
            <h3 className="text-base font-extrabold text-white group-hover:text-brand-300 transition-colors leading-snug">
              {skill.name}
            </h3>
          </div>
          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border whitespace-nowrap ${getStatusBadge(skill.status)}`}>
            {skill.status}
          </span>
        </div>

        {/* Summary */}
        <p className="text-xs text-slate-200 line-clamp-2 mb-4 leading-relaxed font-normal">
          {skill.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skill.tags.slice(0, 4).map(tag => (
            <span key={tag} className="px-2 py-0.5 text-[10px] font-mono bg-slate-950 text-slate-300 rounded-lg border border-slate-800 font-medium">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        {/* Metadata stats */}
        <div className="py-2.5 px-3 bg-slate-950 rounded-xl border border-slate-800 mb-4 flex items-center justify-between text-xs text-slate-300 font-semibold">
          <div className="flex items-center gap-1.5">
            {skill.author_avatar ? (
              <img src={skill.author_avatar} alt={skill.author} className="w-4 h-4 rounded-full object-cover" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-slate-800" />
            )}
            <span className="text-slate-200 truncate max-w-[100px]">{skill.author}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {(skill.stars / 1000).toFixed(1)}k
            </span>
            <span className="font-mono text-[10px] uppercase text-slate-300 border border-slate-800 px-1.5 py-0.2 rounded font-bold">
              {skill.license}
            </span>
          </div>
        </div>

        {/* Supported Agents */}
        <div className="flex items-center gap-1.5 mb-4 overflow-x-auto text-[11px] text-slate-300">
          <Cpu className="w-3.5 h-3.5 shrink-0 text-brand-400" />
          <span className="shrink-0 text-slate-400 font-medium">Targets:</span>
          {skill.supportedAgents.map(ag => (
            <span key={ag} className="capitalize px-1.5 py-0.2 bg-slate-800 text-slate-200 rounded text-[10px] font-semibold">
              {ag.replace('-desktop', '')}
            </span>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-2">
          <span className={`px-2 py-0.5 text-[10px] font-bold rounded border flex items-center gap-1 ${getRiskBadge(skill.riskTier)}`}>
            {skill.riskTier === 'low' ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <ShieldAlert className="w-3 h-3 text-amber-400" />}
            Risk: {skill.riskTier.toUpperCase()}
          </span>

          <button
            onClick={() => setSelectedSkill(skill)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white transition-all shadow-sm hover:scale-105"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Trust Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
