import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Palette,
  Monitor,
  ShieldCheck,
  Terminal,
  RotateCcw,
  Workflow
} from 'lucide-react';

interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  color: string;
  bgColor: string;
  description: string;
  emotions: {
    happy: string;
    curious: string;
    excited: string;
  };
}

const CARTOON_CHARACTERS: CharacterProfile[] = [
  {
    id: 'spark',
    name: 'Spark',
    role: 'The Energetic Inventor',
    color: '#026fc7',
    bgColor: 'bg-brand-500/20 border-brand-500/40 text-brand-300',
    description: 'Always tinkering with high-voltage gadgetry and creating unexpected inventions.',
    emotions: {
      happy: '⚡😊',
      curious: '⚡🧐',
      excited: '⚡🤩'
    }
  },
  {
    id: 'luna',
    name: 'Luna',
    role: 'The Stellar Navigator',
    color: '#a855f7',
    bgColor: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
    description: 'Charts constellations and maps secret cosmic shortcuts through the galaxy.',
    emotions: {
      happy: '🌙✨',
      curious: '🌙🔍',
      excited: '🌙🚀'
    }
  },
  {
    id: 'orbit',
    name: 'Orbit',
    role: 'The Gravity Artist',
    color: '#10b981',
    bgColor: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    description: 'Bends gravitational fields to sculpt floating kinetic art pieces.',
    emotions: {
      happy: '🌀🎨',
      curious: '🌀🤔',
      excited: '🌀💫'
    }
  },
  {
    id: 'pixel',
    name: 'Pixel',
    role: 'The Retro Hacker',
    color: '#f59e0b',
    bgColor: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
    description: 'Decrypts ancient 8-bit arcade codes and transmutes them into futuristic beats.',
    emotions: {
      happy: '👾🎶',
      curious: '👾💻',
      excited: '👾🔥'
    }
  }
];

export const SimulationView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterProfile>(CARTOON_CHARACTERS[0]);
  const [activeEmotion, setActiveEmotion] = useState<'happy' | 'curious' | 'excited'>('happy');
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false);

  const handleNextStep = () => {
    if (activeStep < 5) setActiveStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (activeStep > 1) setActiveStep(prev => prev - 1);
  };

  const handleAutoRun = () => {
    setIsAutoRunning(true);
    setActiveStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step++;
      if (step <= 5) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsAutoRunning(false);
      }
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-12">

      {/* Simulation Header */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PRD Section 17 Worked Example</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Cartoon Character Website Workflow Simulation
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Watch how the 5-stage workflow bundle transforms a raw brief into a art-directed, accessible, tested React web app.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleAutoRun}
              disabled={isAutoRunning}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isAutoRunning ? 'Simulating Stage Pipeline...' : 'Run Automated Simulation'}</span>
            </button>

            <button
              onClick={() => setActiveStep(1)}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700"
              title="Reset to Stage 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Workflow Progress Steps Nav */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {[
            { step: 1, label: '1. Brief Analysis', icon: <Workflow className="w-3.5 h-3.5" /> },
            { step: 2, label: '2. Art Direction', icon: <Palette className="w-3.5 h-3.5" /> },
            { step: 3, label: '3. Responsive UI', icon: <Monitor className="w-3.5 h-3.5" /> },
            { step: 4, label: '4. WCAG 2.2 A11y', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
            { step: 5, label: '5. Playwright E2E', icon: <Terminal className="w-3.5 h-3.5" /> }
          ].map((item) => {
            const isDone = activeStep > item.step;
            const isCurrent = activeStep === item.step;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-brand-600/20 border-brand-500 text-white shadow-md shadow-brand-500/10'
                    : isDone
                    ? 'bg-slate-900 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="flex items-center gap-1">
                    {item.icon}
                    Stage {item.step}
                  </span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
                  ) : null}
                </div>
                <span className="text-xs font-semibold truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Interactive Viewport Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">

        {/* STAGE 1: PRODUCT BRIEF ANALYST */}
        {activeStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  Stage 1 Output Deliverable
                </span>
                <h3 className="text-lg font-bold text-white">Extracted Product Brief & Requirement Matrix</h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono bg-brand-500/10 text-brand-300 border border-brand-500/30 rounded-full">
                Skill: Product Brief Analyst v1.4.0
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Raw User Input Prompt</h4>
                <p className="text-xs font-mono text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed italic">
                  "Build a playful, premium website for a set of original cartoon characters. Each character needs personality, emotion states, and a consistent illustration language. The site should feel art-directed, work on mobile, and be accessible."
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-brand-400 uppercase tracking-wider">Validated Scope & Acceptance Criteria</h4>
                <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                  <li><strong>Target Persona</strong>: Creative Technologists & Indie Cartoon Character Fans.</li>
                  <li><strong>Core Feature 1</strong>: Interactive Character Hub (Spark, Luna, Orbit, Pixel).</li>
                  <li><strong>Core Feature 2</strong>: Live Emotion State Toggles (Happy, Curious, Excited).</li>
                  <li><strong>Non-Goal Explicit Exclusion</strong>: No backend user login accounts or authentication.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: ART DIRECTOR & CHARACTER SYSTEM */}
        {activeStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  Stage 2 Output Deliverable
                </span>
                <h3 className="text-lg font-bold text-white">Visual Identity Tokens & Character Vector Assets</h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-full">
                Skill: Art Director & Character System v2.1.0
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {CARTOON_CHARACTERS.map(char => (
                <div key={char.id} className={`p-4 rounded-xl border space-y-3 ${char.bgColor}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{char.emotions.happy}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/40 text-white">
                      {char.color}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">{char.name}</h4>
                    <p className="text-[11px] opacity-80">{char.role}</p>
                  </div>
                  <p className="text-[11px] opacity-90 leading-relaxed">{char.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STAGE 3: UI/UX PRO MAX INTERACTIVE APP PREVIEW */}
        {activeStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  Stage 3 Output Deliverable
                </span>
                <h3 className="text-lg font-bold text-white">Live Interactive Cartoon Character Web App</h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full">
                Skill: UI/UX Pro Max v3.5.2
              </span>
            </div>

            {/* Live Interactive Web App Rendered Right Here */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-inner">
              <div className="text-center max-w-lg mx-auto space-y-2">
                <span className="px-3 py-1 bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[11px] font-bold rounded-full uppercase tracking-widest">
                  Live Cartoon Character Universe
                </span>
                <h4 className="text-xl font-black text-white">Meet the Stellar Squad</h4>
                <p className="text-xs text-slate-400">
                  Select a character and toggle emotion states to test real-time React component state transitions.
                </p>
              </div>

              {/* Emotion Switcher Bar */}
              <div className="flex items-center justify-center gap-2">
                {(['happy', 'curious', 'excited'] as const).map(em => (
                  <button
                    key={em}
                    onClick={() => setActiveEmotion(em)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      activeEmotion === em
                        ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20 scale-105'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {em === 'happy' ? '😊 Happy' : em === 'curious' ? '🧐 Curious' : '🤩 Excited'}
                  </button>
                ))}
              </div>

              {/* Selected Character Showcase Card */}
              <div className={`p-6 rounded-2xl border ${selectedCharacter.bgColor} transition-all max-w-xl mx-auto space-y-4`}>
                <div className="flex items-center justify-between">
                  <div className="text-5xl animate-bounce">
                    {selectedCharacter.emotions[activeEmotion]}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest opacity-75">Active Emotion</span>
                    <p className="text-sm font-extrabold capitalize text-white">{activeEmotion}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-2xl font-black text-white">{selectedCharacter.name}</h5>
                  <p className="text-xs font-semibold opacity-90">{selectedCharacter.role}</p>
                </div>

                <p className="text-xs leading-relaxed opacity-95">
                  {selectedCharacter.description}
                </p>
              </div>

              {/* Character Selection Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                {CARTOON_CHARACTERS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCharacter(c)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedCharacter.id === c.id
                        ? 'bg-brand-600 text-white border-brand-400 shadow-md'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">{c.emotions.happy}</div>
                    <span className="text-xs font-bold block">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4: WCAG 2.2 AA ACCESSIBILITY AUDIT */}
        {activeStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  Stage 4 Output Deliverable
                </span>
                <h3 className="text-lg font-bold text-white">WCAG 2.2 AA Accessibility Compliance Verification</h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full">
                Skill: A11y Auditor Pro v1.8.1
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 block font-semibold">Contrast Ratio</span>
                <span className="text-2xl font-black text-emerald-400">7.2 : 1 (AAA Pass)</span>
                <p className="text-[11px] text-slate-400">Exceeds 4.5:1 minimum contrast requirement for all button text.</p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 block font-semibold">Keyboard Focus Traps</span>
                <span className="text-2xl font-black text-emerald-400">0 Traps Found</span>
                <p className="text-[11px] text-slate-400">Full keyboard Tab & Shift-Tab navigation verified.</p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 block font-semibold">Screen Reader ARIA</span>
                <span className="text-2xl font-black text-emerald-400">100% Compliant</span>
                <p className="text-[11px] text-slate-400">aria-label, role, and aria-pressed attributes verified on emotion state toggles.</p>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 5: PLAYWRIGHT E2E BROWSER VERIFICATION */}
        {activeStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  Stage 5 Output Deliverable
                </span>
                <h3 className="text-lg font-bold text-white">Playwright E2E Automated Test Log & Visual Screenshot</h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono bg-sky-500/10 text-sky-300 border border-sky-500/30 rounded-full">
                Skill: Playwright Verifier v2.4.0
              </span>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-emerald-300 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
                <span>$ npx playwright test tests/cartoon-character-web.spec.ts</span>
                <span className="text-emerald-400 font-bold">5 passed (1.2s)</span>
              </div>
              <p>✓ [chromium] › cartoon-character-web.spec.ts:12:1 › renders 4 cartoon characters with default happy emotion (280ms)</p>
              <p>✓ [chromium] › cartoon-character-web.spec.ts:24:1 › toggles emotion state to curious and updates SVG graphics (310ms)</p>
              <p>✓ [firefox] › cartoon-character-web.spec.ts:38:1 › responsive mobile viewport visual comparison passes (290ms)</p>
              <p>✓ [webkit] › cartoon-character-web.spec.ts:52:1 › verifies zero browser console errors or unhandled rejections (320ms)</p>
            </div>
          </div>
        )}

        {/* Simulation Bottom Navigation Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handlePrevStep}
            disabled={activeStep === 1}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Previous Stage
          </button>

          <span className="text-xs text-slate-400 font-mono">
            Stage {activeStep} of 5
          </span>

          <button
            onClick={handleNextStep}
            disabled={activeStep === 5}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 disabled:opacity-30 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-brand-500/20"
          >
            <span>Next Stage</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
