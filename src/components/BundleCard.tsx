import React from 'react';
import { Bundle } from '../types';
import { useApp } from '../context/AppContext';
import { Workflow, Sparkles, Shield, Cpu, ArrowRight, CheckCircle2, Download } from 'lucide-react';

interface BundleCardProps {
  bundle: Bundle;
}

export const BundleCard: React.FC<BundleCardProps> = ({ bundle }) => {
  const { openBundleInComposer } = useApp();
  const isFlagship = bundle.id === 'brief-to-polished-web-ui';

  return (
    <div className={`bg-slate-900 border rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-card group relative overflow-hidden ${
      isFlagship
        ? 'border-brand-500/60 shadow-brand bg-gradient-to-b from-slate-900 via-slate-900 to-brand-950/30'
        : 'border-slate-800 hover:border-slate-700'
    }`}>
      {isFlagship && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-brand-500 via-brand-600 to-indigo-600 text-white text-[10px] uppercase font-black tracking-widest px-3.5 py-1 rounded-bl-xl shadow-md flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>PRD Flagship Bundle</span>
        </div>
      )}

      <div>
        {/* Category & Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold text-brand-400 uppercase tracking-wider">
            {bundle.category}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] text-slate-300 font-mono">v{bundle.version}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-white group-hover:text-brand-300 transition-colors mb-2 pr-16 leading-snug">
          {bundle.name}
        </h3>

        {/* Goal / Description */}
        <p className="text-xs text-slate-200 line-clamp-2 mb-4 leading-relaxed font-normal">
          {bundle.goal}
        </p>

        {/* Workflow Sequential Visual Preview */}
        <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-3.5 mb-4 space-y-2.5 shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Workflow className="w-3.5 h-3.5 text-brand-400" />
              Workflow Pipeline ({bundle.components.length} Sequential Roles)
            </span>
            <span className="text-emerald-400 font-extrabold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Score: {bundle.qualityScore}/100
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {bundle.components.map((c, i) => (
              <React.Fragment key={c.id}>
                {i > 0 && <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />}
                <div className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[11px] font-bold text-slate-200 shrink-0 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-brand-500/25 text-brand-300 text-[10px] flex items-center justify-center font-black">
                    {c.order_index}
                  </span>
                  <span className="truncate max-w-[120px]">{c.skill_name}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div>
        {/* Supported Agents */}
        <div className="flex items-center justify-between text-xs text-slate-300 mb-4 pt-1">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-[11px] font-semibold text-slate-300">Agents:</span>
            <div className="flex items-center gap-1">
              {bundle.supportedAgents.map(ag => (
                <span key={ag} className="px-1.5 py-0.5 bg-slate-800 text-slate-200 rounded text-[10px] font-mono font-semibold capitalize">
                  {ag.replace('-desktop', '')}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-300 font-medium">
            <Download className="w-3 h-3 text-slate-400" />
            <span>{bundle.installsCount.toLocaleString()} installs</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/90 gap-2">
          <span className="text-[11px] text-slate-300 font-semibold flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tested & Verified</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openBundleInComposer(bundle.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white transition-all shadow-brand hover:scale-105"
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Compose & Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
