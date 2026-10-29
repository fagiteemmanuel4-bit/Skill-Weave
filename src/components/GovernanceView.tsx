import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AgentTarget, RiskTier } from '../types';
import {
  ShieldAlert,
  CheckCircle2,
  MessageSquare,
  AlertOctagon,
  Clock,
  FileJson,
  Upload,
  Download,
  Info
} from 'lucide-react';

export const GovernanceView: React.FC = () => {
  const { incidents, feedbacks, bundles, addIncidentReport, addFeedbackReport, saveCustomBundle } = useApp();

  const [activeTab, setActiveTab] = useState<'incidents' | 'feedback' | 'importexport'>('incidents');

  // Incident Modal State
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [targetType, setTargetType] = useState<'skill' | 'bundle'>('skill');
  const [targetName, setTargetName] = useState('');
  const [severity, setSeverity] = useState<RiskTier>('high');
  const [reporter] = useState('Community Security Contributor');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  // Feedback Form State
  const [selectedBundleId, setSelectedBundleId] = useState(bundles[0]?.id || '');
  const [selectedAgentRuntime, setSelectedAgentRuntime] = useState<AgentTarget>('claude-desktop');
  const [outcome, setOutcome] = useState<'success' | 'partial' | 'failure'>('success');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [environmentInfo] = useState('Node.js v22.22.1 + macOS Sequoia 15.1');

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetName || !summary) return;

    addIncidentReport({
      target_type: targetType,
      target_id: `target-${Date.now()}`,
      target_name: targetName,
      severity,
      reporter: reporter || 'Community Security Contributor',
      summary,
      description,
      status: 'under_review'
    });

    setShowIncidentModal(false);
    setTargetName('');
    setSummary('');
    setDescription('');
  };

  const handleCreateFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    addFeedbackReport({
      bundle_id: selectedBundleId,
      bundle_version: bundles.find(b => b.id === selectedBundleId)?.version || '1.0.0',
      agent_runtime: selectedAgentRuntime,
      outcome,
      notes: feedbackNotes,
      environment_info: environmentInfo
    });

    setFeedbackNotes('');
    alert('Thank you! Runtime feedback report captured successfully.');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.id && parsed.name && parsed.components) {
          saveCustomBundle(parsed);
          alert(`Successfully imported workflow bundle: "${parsed.name}"`);
        } else {
          alert('Invalid bundle manifest format. Missing required fields (id, name, components).');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">

      {/* Governance Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
              <span>Trust, Safety & Governance Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Incidents, Runtime Feedback & Governance
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl font-normal">
              Transparent security incident reporting, runtime execution success logs, and local data import/export controls.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowIncidentModal(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-500/20 transition-all flex items-center gap-2"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Report Security Incident</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 max-w-md">
          <button
            onClick={() => setActiveTab('incidents')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all text-center ${
              activeTab === 'incidents'
                ? 'bg-slate-800 text-rose-300 border border-rose-500/30 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Incidents ({incidents.length})
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all text-center ${
              activeTab === 'feedback'
                ? 'bg-slate-800 text-brand-300 border border-brand-500/30 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Feedback ({feedbacks.length})
          </button>

          <button
            onClick={() => setActiveTab('importexport')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all text-center ${
              activeTab === 'importexport'
                ? 'bg-slate-800 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Import / Export
          </button>
        </div>
      </div>

      {/* TAB 1: SECURITY INCIDENTS HUB */}
      {activeTab === 'incidents' && (
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Active Security Advisories & Quarantine Log</span>
          </h3>

          <div className="space-y-3">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 transition-all shadow-card"
              >
                <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-rose-400 font-extrabold">{inc.id}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-300">Target: <strong className="text-white">{inc.target_name}</strong></span>
                    </div>
                    <h4 className="text-sm font-extrabold text-white">{inc.summary}</h4>
                  </div>

                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full border ${
                    inc.status === 'quarantined'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : inc.status === 'resolved'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {inc.status}
                  </span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-normal">{inc.description}</p>

                {inc.resolutionNotes && (
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-white block">Resolution Action Notes:</span>
                    <p>{inc.resolutionNotes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Reported by <strong className="text-slate-200">{inc.reporter}</strong></span>
                  <span className="flex items-center gap-1 font-mono text-slate-300"><Clock className="w-3 h-3 text-slate-400" /> {new Date(inc.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: RUNTIME OUTCOME FEEDBACK */}
      {activeTab === 'feedback' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Submit Feedback Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-card">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-brand-400" />
              <span>Submit Agent Runtime Outcome</span>
            </h3>

            <form onSubmit={handleCreateFeedback} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-bold">Select Bundle</label>
                <select
                  value={selectedBundleId}
                  onChange={(e) => setSelectedBundleId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-2.5 focus:border-brand-500 focus:outline-none"
                >
                  {bundles.map(b => (
                    <option key={b.id} value={b.id}>{b.name} (v{b.version})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">Agent Runtime</label>
                <select
                  value={selectedAgentRuntime}
                  onChange={(e) => setSelectedAgentRuntime(e.target.value as AgentTarget)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-2.5 focus:border-brand-500 focus:outline-none"
                >
                  <option value="claude-desktop">Claude Desktop</option>
                  <option value="cursor">Cursor</option>
                  <option value="windsurf">Windsurf</option>
                  <option value="openhands">OpenHands</option>
                  <option value="cli">CLI / Local Repo</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">Execution Outcome</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOutcome('success')}
                    className={`py-2 text-center font-bold rounded-xl border transition-all ${
                      outcome === 'success'
                        ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/50'
                        : 'bg-slate-950 text-slate-300 border-slate-800'
                    }`}
                  >
                    ✓ Success
                  </button>
                  <button
                    type="button"
                    onClick={() => setOutcome('partial')}
                    className={`py-2 text-center font-bold rounded-xl border transition-all ${
                      outcome === 'partial'
                        ? 'bg-amber-500/25 text-amber-300 border-amber-500/50'
                        : 'bg-slate-950 text-slate-300 border-slate-800'
                    }`}
                  >
                    ~ Partial
                  </button>
                  <button
                    type="button"
                    onClick={() => setOutcome('failure')}
                    className={`py-2 text-center font-bold rounded-xl border transition-all ${
                      outcome === 'failure'
                        ? 'bg-rose-500/25 text-rose-300 border-rose-500/50'
                        : 'bg-slate-950 text-slate-300 border-slate-800'
                    }`}
                  >
                    ✗ Failure
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">Execution Notes & Environment</label>
                <textarea
                  value={feedbackNotes}
                  onChange={(e) => setFeedbackNotes(e.target.value)}
                  placeholder="Describe your execution outcome or details..."
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-2.5 h-20 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-colors shadow-brand"
              >
                Submit Outcome Report
              </button>
            </form>
          </div>

          {/* Right Column: Submitted Feedback Feed */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Runtime Execution Logs ({feedbacks.length})</span>
            </h3>

            {feedbacks.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-2 text-xs text-slate-300 shadow-card">
                <Info className="w-8 h-8 text-slate-500 mx-auto" />
                <p>No outcome feedback submitted yet. Use the form on the left to submit an execution report.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {feedbacks.map(fb => (
                  <div key={fb.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs shadow-card">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                          fb.outcome === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {fb.outcome}
                        </span>
                        <span className="font-mono text-slate-200 capitalize font-bold">{fb.agent_runtime}</span>
                      </div>
                      <span className="text-slate-400 text-[10px] font-mono">{new Date(fb.submittedAt).toLocaleTimeString()}</span>
                    </div>
                    {fb.notes && <p className="text-slate-200">{fb.notes}</p>}
                    <p className="text-[10px] font-mono text-slate-400">{fb.environment_info}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 3: IMPORT & EXPORT */}
      {activeTab === 'importexport' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs shadow-card">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-brand-400" />
              <span>Import Bundle Manifest</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Upload a valid <code className="text-brand-300 font-bold">skillweave.bundle.json</code> file to add a portable workflow bundle to your local workspace.
            </p>
            <label className="block bg-slate-950 hover:bg-slate-900 border border-dashed border-slate-700 hover:border-brand-500 rounded-2xl p-8 text-center cursor-pointer transition-colors shadow-inner">
              <FileJson className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <span className="font-bold text-brand-400 block mb-1">Click to select JSON manifest</span>
              <span className="text-[11px] text-slate-400">Supports official v1 schema</span>
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs shadow-card">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Local Storage Persistence</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              SkillWeave runs local-first without requiring external cloud accounts or secrets upload. All custom composed bundles and feedback reports are stored securely in browser LocalStorage.
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                alert('Local storage cleared. App reset to default seed data.');
                window.location.reload();
              }}
              className="px-4 py-2.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40 rounded-xl font-bold"
            >
              Reset LocalStorage Workspace
            </button>
          </div>
        </div>
      )}

      {/* Incident Modal Overlay */}
      {showIncidentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-rose-400" />
                <span>Report Security Advisory / Incident</span>
              </h3>
              <button onClick={() => setShowIncidentModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-bold">Target Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetType('skill')}
                    className={`py-2 text-center font-bold rounded-xl border ${
                      targetType === 'skill' ? 'bg-brand-600 text-white border-brand-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                    }`}
                  >
                    Skill
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetType('bundle')}
                    className={`py-2 text-center font-bold rounded-xl border ${
                      targetType === 'bundle' ? 'bg-brand-600 text-white border-brand-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                    }`}
                  >
                    Bundle
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">Target Name or Identifier</label>
                <input
                  type="text"
                  required
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  placeholder="e.g. unverified-prompt-tool-x"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-2.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">Severity Rating</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as RiskTier)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-2.5 focus:border-brand-500 focus:outline-none capitalize"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">Incident Summary</label>
                <input
                  type="text"
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Brief 1-line description of risk..."
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-2.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">Detailed Evidence</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide technical evidence, code snippets, or flags..."
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-2.5 h-20 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowIncidentModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-200 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl shadow-md"
                >
                  Submit Advisory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
