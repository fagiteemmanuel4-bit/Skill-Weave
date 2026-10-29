import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AgentTarget } from '../types';
import {
  Settings,
  User,
  Shield,
  Trash2,
  Save,
  CheckCircle2,
  Cpu,
  Database
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { user, login } = useApp();

  const [name, setName] = useState(user?.name || 'Alex Vance');
  const [email, setEmail] = useState(user?.email || 'alex.vance@skillweave.io');
  const [org, setOrg] = useState(user?.organization || 'Acme Autonomous Labs');
  const [defaultAgent, setDefaultAgent] = useState<AgentTarget>('claude-desktop');
  const [autoSync, setAutoSync] = useState(true);
  const [strictSec, setStrictSec] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, name);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
              <Settings className="w-3.5 h-3.5 text-brand-400" />
              <span>Workspace Preferences & Configuration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Settings & Account Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Configure default agent target runtimes, security execution policies, profile info, and local storage backup options.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSave}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-brand transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-xs text-emerald-300 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Workspace settings saved successfully!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column 2-cols: Profile & Agent Defaults */}
        <div className="lg:col-span-2 space-y-6">

          {/* Profile Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-card">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <User className="w-4 h-4 text-brand-400" />
              <span>Developer Profile Details</span>
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Organization / Team</label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>
            </form>
          </div>

          {/* Default Runtime & Preferences */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-card">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>Default Agent Runtime Execution Target</span>
            </h3>

            <div className="space-y-3 text-xs">
              <label className="text-slate-300 block font-semibold">Preferred Agent Platform for Export</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'claude-desktop', label: 'Claude Desktop' },
                  { id: 'cursor', label: 'Cursor AI' },
                  { id: 'windsurf', label: 'Windsurf' },
                  { id: 'openhands', label: 'OpenHands' },
                  { id: 'cli', label: 'Universal CLI' }
                ].map((target) => (
                  <button
                    key={target.id}
                    type="button"
                    onClick={() => setDefaultAgent(target.id as AgentTarget)}
                    className={`p-3 rounded-xl border text-center font-bold transition-all ${
                      defaultAgent === target.id
                        ? 'bg-brand-600 text-white border-brand-400 shadow-brand'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {target.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Security & Sandbox Toggles */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-card">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Shield className="w-4 h-4 text-purple-400" />
              <span>Security Execution Policies</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <span className="font-bold text-white block">Enforce Strict Sandbox Permissions</span>
                  <span className="text-slate-400 text-[11px]">Require explicit authorization before shell or network tools run.</span>
                </div>
                <input
                  type="checkbox"
                  checked={strictSec}
                  onChange={(e) => setStrictSec(e.target.checked)}
                  className="w-4 h-4 accent-brand-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <span className="font-bold text-white block">Auto-Sync Skill Manifest Rules</span>
                  <span className="text-slate-400 text-[11px]">Keep local agent rules (.mdc / .md) in sync automatically.</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoSync}
                  onChange={(e) => setAutoSync(e.target.checked)}
                  className="w-4 h-4 accent-brand-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column 1-col: Storage & Danger Zone */}
        <div className="space-y-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-card">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Local Storage & Backup</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <p className="text-slate-400 leading-relaxed">
                SkillWeave stores custom bundles, trust reports, and feedback logs in browser LocalStorage.
              </p>

              <button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", "skillweave_workspace_backup.json");
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
                className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl font-bold transition-colors"
              >
                Export Workspace Backup (.json)
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-rose-500/30 rounded-2xl p-6 space-y-4 shadow-card">
            <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span>Danger Zone</span>
            </h3>

            <div className="space-y-3 text-xs">
              <p className="text-slate-400 leading-relaxed">
                Resetting your workspace will clear all custom bundles and restore original catalog seeds.
              </p>

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all LocalStorage data?')) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                className="w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl font-bold transition-colors"
              >
                Reset Local Workspace
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
