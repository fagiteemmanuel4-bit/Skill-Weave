import React, { useState } from 'react';
import {
  BookOpen,
  Terminal,
  Shield,
  Workflow,
  FileJson,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

export const DocsView: React.FC = () => {
  const [activeDocSection, setActiveDocSection] = useState<'getting-started' | 'trust-protocol' | 'composer-spec' | 'export-format' | 'cli-reference'>('getting-started');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">

      {/* Docs Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-brand-400" />
              <span>SkillWeave Open-Source Documentation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Architecture & Integration Guide
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Complete technical specifications for 3-dimension trust matrices, workflow composition manifests, multi-agent exports, and universal CLI usage.
            </p>
          </div>

          <a
            href="https://github.com/fagiteemmanuel4-bit/Skill-Weave"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2 shrink-0"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none text-xs">
          {[
            { id: 'getting-started', label: '1. Getting Started', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { id: 'trust-protocol', label: '2. Trust Protocol', icon: <Shield className="w-3.5 h-3.5" /> },
            { id: 'composer-spec', label: '3. Workflow Composer', icon: <Workflow className="w-3.5 h-3.5" /> },
            { id: 'export-format', label: '4. Manifest Formats', icon: <FileJson className="w-3.5 h-3.5" /> },
            { id: 'cli-reference', label: '5. Universal CLI', icon: <Terminal className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveDocSection(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeDocSection === tab.id
                  ? 'bg-brand-600 text-white shadow-brand'
                  : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Documentation Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Side Table of Contents */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 h-fit text-xs hidden lg:block shadow-card">
          <h3 className="font-extrabold text-white text-sm uppercase tracking-wider mb-2">Documentation Topics</h3>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveDocSection('getting-started')}
              className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition-colors ${
                activeDocSection === 'getting-started' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Getting Started & Overview
            </button>
            <button
              onClick={() => setActiveDocSection('trust-protocol')}
              className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition-colors ${
                activeDocSection === 'trust-protocol' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3-Dimension Trust Protocol
            </button>
            <button
              onClick={() => setActiveDocSection('composer-spec')}
              className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition-colors ${
                activeDocSection === 'composer-spec' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Visual Composer & Conflict Engine
            </button>
            <button
              onClick={() => setActiveDocSection('export-format')}
              className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition-colors ${
                activeDocSection === 'export-format' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Manifest Formats & Zero Lock-In
            </button>
            <button
              onClick={() => setActiveDocSection('cli-reference')}
              className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition-colors ${
                activeDocSection === 'cli-reference' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Universal CLI Reference
            </button>
          </nav>
        </div>

        {/* Main Content Viewport */}
        <div className="lg:col-span-3 space-y-6">

          {/* SECTION 1: GETTING STARTED */}
          {activeDocSection === 'getting-started' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-card">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Chapter 1</span>
                <h2 className="text-xl font-extrabold text-white mt-1">Getting Started with SkillWeave</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  SkillWeave is an open-source AI agent skill workflow marketplace and visual composer. It replaces unstructured text prompt collections with typed, reviewable, multi-stage skill bundles backed by explicit provenance, tool permission security matrices, and reproducible quality rubrics.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Core Workflow Concepts</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-extrabold text-brand-300 flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      <span>Skill (Atomic Unit)</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      An immutable markdown / prompt specification targeting specific agent runtimes with defined context size, checksum, and tool requirements.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-extrabold text-emerald-300 flex items-center gap-1.5">
                      <Workflow className="w-4 h-4" />
                      <span>Workflow Bundle (Pipeline)</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      A ordered sequence of skills with explicit hand-off contracts (inputs and deliverable artifacts) between stages.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Quick Start Command</h3>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 space-y-2 relative">
                  <button
                    onClick={() => handleCopy('npx skillweave@latest pull brief-to-polished-web-ui', 'qs1')}
                    className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded bg-slate-900 border border-slate-800"
                  >
                    {copiedCode === 'qs1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <p>$ npx skillweave@latest pull brief-to-polished-web-ui</p>
                  <p className="text-slate-500"># Downloads bundle manifest and generates Claude Desktop & Cursor rules</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: TRUST PROTOCOL */}
          {activeDocSection === 'trust-protocol' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-card">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Chapter 2</span>
                <h2 className="text-xl font-extrabold text-white mt-1">The 3-Dimension Trust Protocol</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Every skill and bundle in the SkillWeave registry is continuously verified against three independent trust dimensions before publication.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-extrabold text-sky-400 text-sm">Dimension 1: Provenance & Cryptographic Integrity</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Tracks canonical source repository URL, immutable git commit SHA, license verification, and SHA-256 content checksums. Ensures no prompt tampered in transit.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-extrabold text-emerald-400 text-sm">Dimension 2: Reproducible Quality Rubric (0-100)</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Evaluated across 15+ standardized sandbox fixture runs testing outcome quality, repeatability, context efficiency, and instruction clarity.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-extrabold text-purple-400 text-sm">Dimension 3: Tool Permission & Security Matrix</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Explicit permission declaration for file system read/write, shell execution, outbound network destinations, and secret access.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: VISUAL COMPOSER */}
          {activeDocSection === 'composer-spec' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-card">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Chapter 3</span>
                <h2 className="text-xl font-extrabold text-white mt-1">Visual Workflow Composer & Real-Time Conflict Engine</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  The Visual Composer enables developers to chain skills into custom multi-agent execution pipelines while receiving real-time validation feedback.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Conflict Rule Engine Verification</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                  <li><strong>Duplicate Step Rule</strong>: Flags duplicate skill steps in the pipeline to conserve LLM context window tokens.</li>
                  <li><strong>Prerequisite Dependency Check</strong>: Asserts that upstream deliverable artifacts (e.g. Art Direction SVGs) are generated before dependent downstream steps (e.g. React UI coding).</li>
                  <li><strong>Agent Compatibility Warning</strong>: Alerts if a selected skill step does not support your active target agent runtime.</li>
                </ul>
              </div>
            </div>
          )}

          {/* SECTION 4: MANIFEST FORMATS */}
          {activeDocSection === 'export-format' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-card">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Chapter 4</span>
                <h2 className="text-xl font-extrabold text-white mt-1">Multi-Agent Export Manifests & Zero Lock-In</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  SkillWeave outputs native rules files for every major agent platform without proprietary vendor lock-in.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-brand-300 font-mono">Claude Desktop Config (.claude.md / JSON)</span>
                  <p className="text-slate-400">Structured system prompt excerpt with Model Context Protocol (MCP) server bindings.</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-sky-300 font-mono">Cursor Rules (.mdc)</span>
                  <p className="text-slate-400">Project-level cursor rules specifying globs, role directives, and quality constraints.</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-indigo-300 font-mono">Windsurf Rules (.windsurfrules)</span>
                  <p className="text-slate-400">Cascade agent instructions and step-by-step deliverable contract rules.</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: CLI REFERENCE */}
          {activeDocSection === 'cli-reference' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-card">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Chapter 5</span>
                <h2 className="text-xl font-extrabold text-white mt-1">Universal CLI Command Reference</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  The SkillWeave Universal CLI runs in any local terminal or CI/CD pipeline.
                </p>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-emerald-400">$ skillweave search "cartoon web ui"</p>
                  <p className="text-slate-500 font-sans">Searches published skills and workflow bundles by keyword or agent target.</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-emerald-400">$ skillweave export brief-to-polished-web-ui --target=cursor</p>
                  <p className="text-slate-500 font-sans">Generates `.cursor/rules/brief-to-polished-web-ui.mdc` in local workspace.</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-emerald-400">$ skillweave verify skillweave.bundle.json</p>
                  <p className="text-slate-500 font-sans">Runs local conflict engine and security checksum validation in CI/CD pipelines.</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
