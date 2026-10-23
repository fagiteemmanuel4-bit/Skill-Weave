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
    <div className={`bg-slate-900 border rounded-xl p-5 flex flex-col justify-between transition-all hover:shadow-xl group relative overflow-hidden ${
      isFlagship
        ? 'border-brand-500/50 shadow-brand-500/10 bg-gradient-to-b from-slate-900 via-slate-900 to-brand-950/20'
        : 'border-slate-800 hover:border-slate-700'
    }`}>
      {isFlagship && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-brand-500 to-indigo-600 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-bl-xl shadow-md flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>PRD Flagship Bundle</span>
        </div>
      )}

      <div>
        {/* Category & Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-semibold text-brand-400 uppercase tracking-wider">
            {bundle.category}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] text-slate-400 font-mono">v{bundle.version}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors mb-2 pr-16">
          {bundle.name}
        </h3>

        {/* Goal / Description */}
        <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {bundle.goal}
        </p>

        {/* Workflow Sequential Visual Preview */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 mb-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-slate-300">
              <Workflow className="w-3.5 h-3.5 text-brand-400" />
              Workflow Pipeline ({bundle.components.length} Sequential Roles)
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Score: {bundle.qualityScore}/100
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {bundle.components.map((c, i) => (
              <React.Fragment key={c.id}>
                {i > 0 && <ArrowRight className="w-3 h-3 text-slate-600 shrink-0" />}
                <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-[11px] font-medium text-slate-300 shrink-0 flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-brand-500/20 text-brand-300 text-[9px] flex items-center justify-center font-bold">
                    {c.order_index}
                  </span>
                  <span className="truncate max-w-[110px]">{c.skill_name}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div>
        {/* Supported Agents */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pt-2">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[11px]">Agents:</span>
            <div className="flex items-center gap-1">
              {bundle.supportedAgents.map(ag => (
                <span key={ag} className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded text-[10px] font-mono capitalize">
                  {ag.replace('-desktop', '')}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Download className="w-3 h-3 text-slate-500" />
            <span>{bundle.installsCount.toLocaleString()} installs</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-2">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tested & Verified</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openBundleInComposer(bundle.id)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors shadow-md shadow-brand-500/20"
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
