import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  GitCommit,
  CheckCircle2,
  ShieldAlert,
  FileCode,
  ExternalLink,
  Copy,
  Check,
  Cpu,
  BarChart3,
  Terminal,
  Lock,
  Globe
} from 'lucide-react';

export const SkillDetailModal: React.FC = () => {
  const { selectedSkill, setSelectedSkill } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'provenance' | 'quality' | 'security'>('overview');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!selectedSkill) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const trust = selectedSkill.trustReport;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-900/90">
          <div className="flex items-start gap-4">
            {selectedSkill.author_avatar ? (
              <img src={selectedSkill.author_avatar} alt={selectedSkill.author} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-brand-600/20 text-brand-300 font-bold text-xl flex items-center justify-center border border-brand-500/30">
                {selectedSkill.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
                  {selectedSkill.category}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">{selectedSkill.currentVersion.id}</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">{selectedSkill.name}</h2>
              <p className="text-xs text-slate-400 mt-1">
                By <span className="text-slate-200 font-medium">{selectedSkill.author}</span> • Licensed under <span className="font-mono text-slate-300">{selectedSkill.license}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedSkill(null)}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 bg-slate-950 border-b border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Overview & Prompt</span>
          </button>

          <button
            onClick={() => setActiveTab('provenance')}
            className={`py-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'provenance'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitCommit className="w-4 h-4 text-sky-400" />
            <span>1. Provenance & Checksum</span>
          </button>

          <button
            onClick={() => setActiveTab('quality')}
            className={`py-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'quality'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>2. Quality Rubric ({trust.quality.overallScore}/100)</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-4 h-4 text-purple-400" />
            <span>3. Security & Permissions</span>
          </button>
        </div>

        {/* Modal Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Description</h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {selectedSkill.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-brand-400" />
                    <span>System Prompt Excerpt</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    Est. {selectedSkill.currentVersion.context_tokens_estimate.toLocaleString()} context tokens
                  </span>
                </div>

                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300 relative overflow-x-auto">
                  <button
                    onClick={() => handleCopy(selectedSkill.currentVersion.system_prompt_excerpt, 'prompt')}
                    className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded bg-slate-900 border border-slate-800"
                  >
                    {copiedField === 'prompt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <pre className="whitespace-pre-wrap">{selectedSkill.currentVersion.system_prompt_excerpt}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-2">Supported Agent Runtimes</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.supportedAgents.map(ag => (
                    <div key={ag} className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 flex items-center gap-2 capitalize">
                      <Cpu className="w-3.5 h-3.5 text-brand-400" />
                      <span>{ag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROVENANCE */}
          {activeTab === 'provenance' && (
            <div className="space-y-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-slate-400">Canonical Source Repository</span>
                  <a
                    href={trust.provenance.repository_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1 underline"
                  >
                    <span>{trust.provenance.repository_url}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-slate-400">Immutable Commit SHA</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-sky-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                      {trust.provenance.commit_sha}
                    </code>
                    <button
                      onClick={() => handleCopy(trust.provenance.commit_sha, 'commit')}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedField === 'commit' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-slate-400">SHA-256 Content Checksum</span>
                  <div className="flex items-center gap-2 max-w-sm">
                    <code className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-1 rounded border border-slate-800 truncate">
                      {trust.provenance.checksum}
                    </code>
                    <button
                      onClick={() => handleCopy(trust.provenance.checksum, 'checksum')}
                      className="text-slate-400 hover:text-white shrink-0"
                    >
                      {copiedField === 'checksum' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">License Verification</span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified {trust.provenance.license}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: QUALITY RUBRIC */}
          {activeTab === 'quality' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Outcome Quality</span>
                  <span className="text-2xl font-black text-brand-400">{trust.quality.outcomeQuality}%</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Repeatability</span>
                  <span className="text-2xl font-black text-emerald-400">{trust.quality.repeatability}%</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Compatibility</span>
                  <span className="text-2xl font-black text-sky-400">{trust.quality.compatibility}%</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Maintainability</span>
                  <span className="text-2xl font-black text-purple-400">{trust.quality.maintainability}%</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Instruction Clarity</span>
                  <span className="text-2xl font-black text-amber-400">{trust.quality.usabilityOfInstructions}%</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Context Efficiency</span>
                  <span className="text-2xl font-black text-indigo-400">{trust.quality.contextEfficiency}%</span>
                </div>
              </div>

              <div className="bg-brand-950/30 border border-brand-500/30 p-4 rounded-xl text-xs text-slate-300">
                <p className="font-semibold text-brand-300 mb-1">Evaluation Method Notice:</p>
                <p>
                  Scores reflect standardized task fixture execution across 15+ independent runs in sandbox environments. No arbitrary single-number safety claims made.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & PERMISSIONS */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-3">Tool Permissions Required</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className={`p-3 rounded-lg border flex items-center justify-between ${
                    trust.security.tool_permissions.filesystem_read ? 'bg-slate-950 text-slate-200 border-slate-800' : 'bg-slate-950/40 text-slate-500 border-slate-900'
                  }`}>
                    <span>Filesystem Read</span>
                    <span className="font-bold">{trust.security.tool_permissions.filesystem_read ? 'YES' : 'NO'}</span>
                  </div>

                  <div className={`p-3 rounded-lg border flex items-center justify-between ${
                    trust.security.tool_permissions.filesystem_write ? 'bg-slate-950 text-slate-200 border-slate-800' : 'bg-slate-950/40 text-slate-500 border-slate-900'
                  }`}>
                    <span>Filesystem Write</span>
                    <span className="font-bold">{trust.security.tool_permissions.filesystem_write ? 'YES' : 'NO'}</span>
                  </div>

                  <div className={`p-3 rounded-lg border flex items-center justify-between ${
                    trust.security.tool_permissions.shell_execution ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-slate-950/40 text-slate-500 border-slate-900'
                  }`}>
                    <span>Shell Exec</span>
                    <span className="font-bold">{trust.security.tool_permissions.shell_execution ? 'YES' : 'NO'}</span>
                  </div>

                  <div className={`p-3 rounded-lg border flex items-center justify-between ${
                    trust.security.tool_permissions.network_outbound ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' : 'bg-slate-950/40 text-slate-500 border-slate-900'
                  }`}>
                    <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> Outbound Net</span>
                    <span className="font-bold">{trust.security.tool_permissions.network_outbound ? 'YES' : 'NO'}</span>
                  </div>

                  <div className={`p-3 rounded-lg border flex items-center justify-between ${
                    trust.security.tool_permissions.secrets_access ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' : 'bg-slate-950/40 text-slate-500 border-slate-900'
                  }`}>
                    <span>Secrets Access</span>
                    <span className="font-bold">{trust.security.tool_permissions.secrets_access ? 'YES' : 'NO'}</span>
                  </div>
                </div>
              </div>

              {trust.security.findings.length > 0 ? (
                <div>
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>Security Findings ({trust.security.findings.length})</span>
                  </h3>
                  <div className="space-y-3">
                    {trust.security.findings.map(f => (
                      <div key={f.id} className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl space-y-1 text-xs">
                        <div className="flex items-center justify-between font-bold text-amber-300">
                          <span>{f.category} ({f.id})</span>
                          <span className="uppercase text-[10px] bg-amber-500/20 px-2 py-0.5 rounded">{f.severity}</span>
                        </div>
                        <p className="text-slate-300">{f.description}</p>
                        <p className="text-slate-400 font-mono text-[11px] pt-1">
                          Recommendation: {f.recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero security issues detected in static analysis & sandbox inspection. Expiry date: {trust.security.expiry_date.split('T')[0]}.</span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Reviewed by <span className="text-slate-200 font-medium">{trust.security.reviewer}</span></span>
          <button
            onClick={() => setSelectedSkill(null)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
          >
            Close Trust Report
          </button>
        </div>

      </div>
    </div>
  );
};
