import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AgentTarget } from '../types';
import {
  Cpu,
  CheckCircle2,
  XCircle,
  Key,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  ExternalLink,
  FileCode,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const IntegrationView: React.FC = () => {
  const {
    integrations,
    toggleIntegration,
    integrationApiKeys,
    saveIntegrationApiKey
  } = useApp();

  const [selectedAgentTab, setSelectedAgentTab] = useState<string>('claude-desktop');
  const [keyInput, setKeyInput] = useState<string>('');
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const activeIntegration = integrations.find(i => i.id === selectedAgentTab) || integrations[0];

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput) return;
    saveIntegrationApiKey(activeIntegration.id, keyInput);
    setKeyInput('');
    alert(`API Key successfully saved for ${activeIntegration.name}!`);
  };

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert(`Synchronized SkillWeave manifests with ${activeIntegration.name}. All skills up to date.`);
    }, 1200);
  };

  const getAgentSnippet = (target: AgentTarget | 'github' | 'vercel'): string => {
    switch (target) {
      case 'claude-desktop':
        return `// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "skillweave": {
      "command": "npx",
      "args": ["-y", "@skillweave/mcp-server@latest"],
      "env": {
        "SKILLWEAVE_API_KEY": "${integrationApiKeys['claude-desktop'] || 'sk-claude-demo-key-889123'}"
      }
    }
  }
}`;
      case 'cursor':
        return `# .cursor/rules/skillweave.mdc
---
description: SkillWeave AI Agent Skill Rules
globs: **/*
---
# SkillWeave Agent Directive
Use SkillWeave composition manifests in .skillweave/bundles for multi-step task execution.
Enforce WCAG 2.2 AA accessibility and Playwright E2E testing before completing frontend deliverables.`;
      case 'windsurf':
        return `# .windsurfrules
# SkillWeave Agent Orchestration Rules
- Always verify step dependencies in skillweave.bundle.json
- Output clean TypeScript React components matching design tokens
- Verify zero security permission escalation without explicit user consent`;
      case 'openhands':
        return `# OpenHands Micro-Agent Configuration (.openhands/config.toml)
[mcp.servers.skillweave]
command = "npx"
args = ["-y", "@skillweave/mcp-server@latest"]
env = { SKILLWEAVE_API_KEY = "${integrationApiKeys['openhands'] || 'sk-openhands-demo-key-556123'}" }`;
      case 'cli':
        return `# Install SkillWeave Universal CLI globally
npm install -g @skillweave/cli

# Login and test connection
skillweave auth login --key "${integrationApiKeys['cli'] || 'sk-cli-key-102938'}"
skillweave pull brief-to-polished-web-ui --target=claude-desktop`;
      case 'github':
        return `# .github/workflows/skillweave-verify.yml
name: SkillWeave Workflow Verification
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: skillweave-ai/action-verify@v1
        with:
          bundle-manifest: 'skillweave.bundle.json'
          api-key: \${{ secrets.SKILLWEAVE_API_KEY }}`;
      case 'vercel':
        return `# vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}`;
      default:
        return `# SkillWeave Generic Integration Config`;
    }
  };

  const handleCopySnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">

      {/* Integration Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-brand-400" />
              <span>Multi-Agent Integration Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Agent Runtime & Tool Integrations
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Connect SkillWeave directly to Claude Desktop, Cursor, Windsurf, OpenHands, CLI tools, and GitHub Workflows for seamless skill execution without vendor lock-in.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-brand transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing Rules...' : 'Sync All Agents Now'}</span>
            </button>
          </div>
        </div>

        {/* Integration Status Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
          {integrations.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedAgentTab(item.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                selectedAgentTab === item.id
                  ? 'bg-brand-600/20 border-brand-500/80 text-white shadow-glow'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                <span className="truncate">{item.version}</span>
                {item.connected ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                )}
              </div>
              <span className="text-xs font-bold text-slate-200 truncate">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Integration Config Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left 2-Cols: Active Integration Details & Setup Guide */}
        <div className="lg:col-span-2 space-y-6">

          {/* Active Integration Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-card">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-brand">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold text-white">{activeIntegration.name}</h2>
                    <span className="px-2.5 py-0.5 text-xs font-mono font-semibold bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                      {activeIntegration.version}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Target Runtime: <code className="text-brand-300 font-mono">{activeIntegration.agentTarget}</code>
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => toggleIntegration(activeIntegration.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeIntegration.connected
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                {activeIntegration.connected ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Connected & Active</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-slate-500" />
                    <span>Connect Agent</span>
                  </>
                )}
              </button>
            </div>

            {/* API Key / Token Setup Section */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Key className="w-4 h-4 text-brand-400" />
                  <span>API Secret & Security Token</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  {integrationApiKeys[activeIntegration.id] ? '••••••••' + integrationApiKeys[activeIntegration.id].slice(-4) : 'Not configured'}
                </span>
              </div>

              <form onSubmit={handleSaveKey} className="flex gap-2">
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="Paste sk-skillweave-... API key or MCP token"
                  className="flex-1 bg-slate-900 border border-slate-800 focus:border-brand-500 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-lg transition-colors shadow-sm"
                >
                  Save Token
                </button>
              </form>
            </div>

            {/* Configuration Snippet & Quick Copy */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-sky-400" />
                  <span>Configuration Manifest & Rules</span>
                </h3>
                <button
                  onClick={() => handleCopySnippet(getAgentSnippet(activeIntegration.agentTarget))}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet ? 'Copied!' : 'Copy Config'}</span>
                </button>
              </div>

              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300 relative overflow-x-auto">
                <pre className="whitespace-pre-wrap">{getAgentSnippet(activeIntegration.agentTarget)}</pre>
              </div>
            </div>

          </div>

        </div>

        {/* Right 1-Col: Integration Checklist & Quick Actions */}
        <div className="space-y-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-card">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Integration Security Matrix</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                <span className="font-bold text-white block">Local-First Sandbox</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  No code or proprietary system prompts leave your workstation without explicit permission.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                <span className="font-bold text-white block">Immutable Checksums</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  All downloaded skill manifests are validated against SHA-256 hashes to prevent supply-chain attacks.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                <span className="font-bold text-white block">Zero Cloud Lock-In</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Easily export rules files (.mdc, .md, .json) to run offline in any local IDE or agent terminal.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-brand-950/40 to-slate-900 border border-brand-500/30 rounded-2xl p-6 space-y-3 text-xs shadow-card">
            <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Need Custom Agent Integration?</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              SkillWeave supports custom Model Context Protocol (MCP) tool bindings and CLI agent hooks.
            </p>
            <a
              href="https://github.com/fagiteemmanuel4-bit/Skill-Weave"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-bold underline pt-1"
            >
              <span>Read Integration Specification Docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
