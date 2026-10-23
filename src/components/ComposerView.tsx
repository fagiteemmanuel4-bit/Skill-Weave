import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bundle, BundleComponent } from '../types';
import { analyzeBundleConflicts } from '../utils/conflictEngine';
import {
  Workflow,
  ArrowDown,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  AlertTriangle,
  CheckCircle2,
  Info,
  Save,
  PlusCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const ComposerView: React.FC = () => {
  const { selectedBundle, skills, saveCustomBundle, openSkillModal } = useApp();

  const [activeBundle, setActiveBundle] = useState<Bundle>(() => {
    if (selectedBundle) return selectedBundle;
    return {
      id: `custom-bundle-${Date.now()}`,
      name: 'Custom AI Agent Workflow',
      slug: 'custom-ai-agent-workflow',
      goal: 'Define your desired outcome and sequence compatible agent skills.',
      summary: 'Custom user composed workflow bundle.',
      description: 'A custom multi-step AI agent skill workflow built using SkillWeave Visual Composer.',
      author: 'Indie Builder',
      version: '1.0.0',
      status: 'Indexed',
      visibility: 'public',
      category: 'Custom Workflows',
      tags: ['custom', 'workflow'],
      supportedAgents: ['claude-desktop', 'cursor', 'windsurf', 'openhands'],
      components: [],
      overallRiskTier: 'low',
      qualityScore: 90,
      conflictWarnings: [],
      updated_at: new Date().toISOString(),
      installsCount: 1
    };
  });

  const [selectedSkillToAdd, setSelectedSkillToAdd] = useState<string>(skills[0]?.id || '');

  // Keep synced if selectedBundle changes from catalog
  useEffect(() => {
    if (selectedBundle) {
      setActiveBundle(selectedBundle);
    }
  }, [selectedBundle]);

  // Run Conflict Engine on current bundle state
  const liveConflicts = analyzeBundleConflicts(activeBundle, skills);

  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    const newComps = [...activeBundle.components];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newComps.length) return;

    const temp = newComps[index];
    newComps[index] = newComps[targetIdx];
    newComps[targetIdx] = temp;

    // Recalculate order indices
    const reordered = newComps.map((c, i) => ({
      ...c,
      order_index: i + 1
    }));

    setActiveBundle({
      ...activeBundle,
      components: reordered
    });
  };

  const handleRemoveStep = (id: string) => {
    const updated = activeBundle.components
      .filter(c => c.id !== id)
      .map((c, i) => ({
        ...c,
        order_index: i + 1
      }));

    setActiveBundle({
      ...activeBundle,
      components: updated
    });
  };

  const handleAddSkillStep = () => {
    const skillObj = skills.find(s => s.id === selectedSkillToAdd);
    if (!skillObj) return;

    const newComp: BundleComponent = {
      id: `step-${Date.now()}`,
      bundle_id: activeBundle.id,
      skill_id: skillObj.id,
      skill_name: skillObj.name,
      role: `${activeBundle.components.length + 1}. ${skillObj.name} Stage`,
      order_index: activeBundle.components.length + 1,
      input_handoff: 'Previous step output artifact',
      output_deliverable: 'Structured deliverable artifact'
    };

    setActiveBundle({
      ...activeBundle,
      components: [...activeBundle.components, newComp]
    });
  };

  const handleUpdateStepField = (id: string, field: keyof BundleComponent, value: string) => {
    const updated = activeBundle.components.map(c => {
      if (c.id === id) {
        return { ...c, [field]: value };
      }
      return c;
    });

    setActiveBundle({
      ...activeBundle,
      components: updated
    });
  };

  const handleSave = () => {
    saveCustomBundle(activeBundle);
    alert('Workflow bundle successfully saved to LocalStorage!');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
                Visual Workflow Composer
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-400">{activeBundle.id}</span>
            </div>
            <input
              type="text"
              value={activeBundle.name}
              onChange={(e) => setActiveBundle({ ...activeBundle, name: e.target.value })}
              className="text-xl sm:text-2xl font-extrabold text-white bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-lg px-3 py-1 w-full max-w-xl focus:outline-none"
            />
            <input
              type="text"
              value={activeBundle.goal}
              onChange={(e) => setActiveBundle({ ...activeBundle, goal: e.target.value })}
              placeholder="Describe the desired outcome goal for this bundle..."
              className="text-xs sm:text-sm text-slate-300 bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-lg px-3 py-1.5 w-full max-w-2xl focus:outline-none mt-2"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-500/20 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Workflow Bundle</span>
            </button>
          </div>
        </div>

        {/* Real-Time Conflict Analysis Status Banner */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Workflow className="w-4 h-4 text-brand-400" />
              Real-Time Conflict & Compatibility Engine
            </span>
            {liveConflicts.length === 0 ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Zero Conflict Warnings (Valid Bundle)
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                {liveConflicts.length} Conflict Issue(s) Detected
              </span>
            )}
          </div>

          {liveConflicts.length > 0 && (
            <div className="space-y-2 pt-2">
              {liveConflicts.map((c) => (
                <div
                  key={c.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                    c.severity === 'error'
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      : c.severity === 'warning'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      {c.severity === 'error' ? (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      ) : (
                        <Info className="w-3.5 h-3.5" />
                      )}
                      {c.title}
                    </span>
                    <span className="uppercase text-[9px] font-mono px-2 py-0.5 rounded bg-black/30">
                      {c.severity}
                    </span>
                  </div>
                  <p className="text-slate-200">{c.description}</p>
                  <p className="text-slate-400 font-mono text-[11px] pt-1">
                    Advice: {c.resolutionAdvice}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Composer Drag-and-Drop / Reordering List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Sequential Step Pipeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Sequential Role Pipeline ({activeBundle.components.length} Steps)</span>
            </h3>
            <span className="text-xs text-slate-400">Order & Handoff Logic</span>
          </div>

          {activeBundle.components.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-3">
              <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-xs text-slate-400">
                No skill steps in this workflow yet. Select a skill from the panel on the right to add a step.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeBundle.components.map((comp, index) => (
                <React.Fragment key={comp.id}>
                  {index > 0 && (
                    <div className="flex items-center justify-center py-1">
                      <ArrowDown className="w-5 h-5 text-brand-500/70" />
                    </div>
                  )}

                  <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 transition-all">

                    {/* Step Card Header */}
                    <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-brand-600/20 text-brand-300 border border-brand-500/30 font-bold text-xs flex items-center justify-center">
                          {comp.order_index}
                        </span>
                        <div>
                          <input
                            type="text"
                            value={comp.role}
                            onChange={(e) => handleUpdateStepField(comp.id, 'role', e.target.value)}
                            className="text-sm font-bold text-white bg-slate-950 border border-slate-800 focus:border-brand-500 rounded px-2 py-0.5"
                          />
                          <p className="text-xs text-slate-400 mt-0.5">
                            Skill: <button onClick={() => openSkillModal(comp.skill_id)} className="text-brand-400 hover:underline font-semibold">{comp.skill_name}</button>
                          </p>
                        </div>
                      </div>

                      {/* Step Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveStep(index, 'up')}
                          disabled={index === 0}
                          className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded hover:bg-slate-800"
                          title="Move step up"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMoveStep(index, 'down')}
                          disabled={index === activeBundle.components.length - 1}
                          className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded hover:bg-slate-800"
                          title="Move step down"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveStep(comp.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 rounded hover:bg-rose-500/10 ml-2"
                          title="Remove step"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Handoff Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-slate-400 block mb-1 font-semibold">Input Handoff Expectation</label>
                        <input
                          type="text"
                          value={comp.input_handoff}
                          onChange={(e) => handleUpdateStepField(comp.id, 'input_handoff', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-brand-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 block mb-1 font-semibold">Output Deliverable Artifact</label>
                        <input
                          type="text"
                          value={comp.output_deliverable}
                          onChange={(e) => handleUpdateStepField(comp.id, 'output_deliverable', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-brand-500 focus:outline-none"
                        />
                      </div>
                    </div>

                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Skill Picker & Add Step Tool */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-brand-400" />
              <span>Add Skill to Workflow</span>
            </h3>

            <div className="space-y-3">
              <label className="text-xs text-slate-400 block font-medium">Select Skill from Catalog</label>
              <select
                value={selectedSkillToAdd}
                onChange={(e) => setSelectedSkillToAdd(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg p-2.5 focus:border-brand-500 focus:outline-none"
              >
                {skills.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category})
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddSkillStep}
                className="w-full py-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Append Step to Pipeline</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 space-y-3 text-xs text-slate-300">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Info className="w-4 h-4 text-sky-400" />
              <span>Composition Best Practices</span>
            </h4>
            <ul className="space-y-2 text-slate-400 list-disc pl-4 leading-relaxed">
              <li>Sequence steps from requirements analysis to art direction, UI implementation, accessibility, and E2E verification.</li>
              <li>Specify unambiguous deliverable contracts so downstream agent steps do not make false assumptions.</li>
              <li>Verify that all steps support your target agent runtime (Claude, Cursor, Windsurf, OpenHands).</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
