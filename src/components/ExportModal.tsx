import React, { useState } from 'react';
import { Bundle, AgentTarget } from '../types';
import {
  generateBundleManifestJson,
  generateClaudeDesktopConfig,
  generateCursorRulesMdc,
  generateWindsurfRulesMd,
  generateCliScript
} from '../utils/exportGenerator';
import {
  X,
  Download,
  Copy,
  Check,
  FileJson,
  Terminal,
  Cpu,
  FileCode,
  CheckCircle2
} from 'lucide-react';

interface ExportModalProps {
  bundle: Bundle;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ bundle, onClose }) => {
  const [exportFormat, setExportFormat] = useState<'json' | 'claude' | 'cursor' | 'windsurf' | 'cli'>('json');
  const [selectedCliAgent, setSelectedCliAgent] = useState<AgentTarget>('claude-desktop');
  const [copied, setCopied] = useState(false);

  const getExportContent = (): string => {
    switch (exportFormat) {
      case 'json':
        return generateBundleManifestJson(bundle);
      case 'claude':
        return generateClaudeDesktopConfig(bundle);
      case 'cursor':
        return generateCursorRulesMdc(bundle);
      case 'windsurf':
        return generateWindsurfRulesMd(bundle);
      case 'cli':
        return generateCliScript(bundle, selectedCliAgent);
    }
  };

  const content = getExportContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filenameMap: Record<string, string> = {
      json: `${bundle.slug}.bundle.json`,
      claude: `${bundle.slug}.claude.md`,
      cursor: `${bundle.slug}.mdc`,
      windsurf: `${bundle.slug}.windsurf.md`,
      cli: `install-${bundle.slug}.sh`
    };

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filenameMap[exportFormat] || 'bundle-export.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-900/90">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Multi-Agent Export & Installer Manifest
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-300 font-bold">v{bundle.version}</span>
            </div>
            <h2 className="text-xl font-black text-white">{bundle.name}</h2>
            <p className="text-xs text-slate-300 mt-1 font-normal">
              Generate native agent configs or CLI scripts for local execution without lock-in.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 bg-slate-950 border-b border-slate-800 overflow-x-auto">
          <button
            onClick={() => setExportFormat('json')}
            className={`py-3.5 px-3.5 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              exportFormat === 'json'
                ? 'border-brand-500 text-brand-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileJson className="w-4 h-4 text-brand-400" />
            <span>JSON Manifest</span>
          </button>

          <button
            onClick={() => setExportFormat('claude')}
            className={`py-3.5 px-3.5 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              exportFormat === 'claude'
                ? 'border-brand-500 text-brand-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>Claude Desktop</span>
          </button>

          <button
            onClick={() => setExportFormat('cursor')}
            className={`py-3.5 px-3.5 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              exportFormat === 'cursor'
                ? 'border-brand-500 text-brand-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4 text-sky-400" />
            <span>Cursor (.mdc)</span>
          </button>

          <button
            onClick={() => setExportFormat('windsurf')}
            className={`py-3.5 px-3.5 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              exportFormat === 'windsurf'
                ? 'border-brand-500 text-brand-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span>Windsurf (.md)</span>
          </button>

          <button
            onClick={() => setExportFormat('cli')}
            className={`py-3.5 px-3.5 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              exportFormat === 'cli'
                ? 'border-brand-500 text-brand-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Bash Installer</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">

          {exportFormat === 'cli' && (
            <div className="flex items-center gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-bold">
              <span className="text-slate-300">Select Target Agent for Script:</span>
              <select
                value={selectedCliAgent}
                onChange={(e) => setSelectedCliAgent(e.target.value as AgentTarget)}
                className="bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-2.5 py-1 focus:outline-none"
              >
                <option value="claude-desktop">Claude Desktop</option>
                <option value="cursor">Cursor</option>
                <option value="windsurf">Windsurf</option>
                <option value="openhands">OpenHands</option>
                <option value="cli">CLI / Local Repo</option>
              </select>
            </div>
          )}

          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs text-slate-200 relative overflow-x-auto max-h-[50vh] shadow-inner">
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Snippet'}</span>
              </button>
            </div>
            <pre className="whitespace-pre-wrap">{content}</pre>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Lock-In & Portable Execution</span>
            </div>
            <p className="text-slate-300">
              This exported manifest specifies immutable step ordering, deliverables, and checksums. You can uninstall at any time by removing the file.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300 font-semibold">
          <span>Targeting {bundle.supportedAgents.length} verified agent runtimes</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-xl transition-colors flex items-center gap-1.5 shadow-brand"
            >
              <Download className="w-4 h-4" />
              <span>Download File</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
