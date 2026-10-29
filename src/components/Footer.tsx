import React from 'react';
import { Github, Shield, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-300 font-medium">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 font-black text-white text-sm">
            <span>SkillWeave</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-normal text-xs">AI Agent Skill Workflow Marketplace</span>
          </div>
          <span className="hidden sm:inline text-slate-700">|</span>
          <p className="text-slate-300">
            Open source under <span className="text-white font-mono font-bold">MIT License</span>. Designed for reproducible agent outcomes.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>3-Dimension Trust Protocol</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Terminal className="w-3.5 h-3.5 text-brand-400" />
            <span>Portable Agent Manifests</span>
          </div>
          <a
            href="https://github.com/fagiteemmanuel4-bit/Skill-Weave"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-200 font-bold hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
