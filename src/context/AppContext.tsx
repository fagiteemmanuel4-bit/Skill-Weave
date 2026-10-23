import React, { createContext, useContext, useState } from 'react';
import { Skill, Bundle, IncidentReport, UserFeedbackReport, AgentTarget, RiskTier } from '../types';
import { SEED_SKILLS, SEED_BUNDLES, SEED_INCIDENTS } from '../data/seedData';

export type ActiveTab = 'catalog' | 'composer' | 'simulation' | 'governance' | 'docs';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  skills: Skill[];
  bundles: Bundle[];
  incidents: IncidentReport[];
  feedbacks: UserFeedbackReport[];
  selectedSkill: Skill | null;
  setSelectedSkill: (skill: Skill | null) => void;
  selectedBundle: Bundle | null;
  setSelectedBundle: (bundle: Bundle | null) => void;

  // Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedAgent: AgentTarget | 'all';
  setSelectedAgent: (agent: AgentTarget | 'all') => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedRiskTier: RiskTier | 'all';
  setSelectedRiskTier: (risk: RiskTier | 'all') => void;
  clearFilters: () => void;

  // Actions
  saveCustomBundle: (bundle: Bundle) => void;
  deleteBundle: (bundleId: string) => void;
  addIncidentReport: (incident: Omit<IncidentReport, 'id' | 'createdAt'>) => void;
  addFeedbackReport: (feedback: Omit<UserFeedbackReport, 'id' | 'submittedAt'>) => void;
  openSkillModal: (skillId: string) => void;
  openBundleInComposer: (bundleId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_BUNDLES_KEY = 'skillweave_custom_bundles_v1';
const LOCAL_FEEDBACK_KEY = 'skillweave_user_feedback_v1';
const LOCAL_INCIDENTS_KEY = 'skillweave_incidents_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [skills] = useState<Skill[]>(SEED_SKILLS);
  const [bundles, setBundles] = useState<Bundle[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_BUNDLES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...SEED_BUNDLES, ...parsed];
      }
    } catch (e) {
      console.error('Failed to parse local bundles', e);
    }
    return SEED_BUNDLES;
  });

  const [incidents, setIncidents] = useState<IncidentReport[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_INCIDENTS_KEY);
      if (saved) {
        return [...SEED_INCIDENTS, ...JSON.parse(saved)];
      }
    } catch (e) {
      console.error('Failed to parse local incidents', e);
    }
    return SEED_INCIDENTS;
  });

  const [feedbacks, setFeedbacks] = useState<UserFeedbackReport[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_FEEDBACK_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse local feedback', e);
    }
    return [];
  });

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(SEED_BUNDLES[0]);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<AgentTarget | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRiskTier, setSelectedRiskTier] = useState<RiskTier | 'all'>('all');

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedAgent('all');
    setSelectedCategory('all');
    setSelectedRiskTier('all');
  };

  const saveCustomBundle = (newBundle: Bundle) => {
    setBundles(prev => {
      const existingIdx = prev.findIndex(b => b.id === newBundle.id);
      let updated: Bundle[];
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = newBundle;
      } else {
        updated = [newBundle, ...prev];
      }
      try {
        const customOnly = updated.filter(b => !SEED_BUNDLES.some(sb => sb.id === b.id));
        localStorage.setItem(LOCAL_BUNDLES_KEY, JSON.stringify(customOnly));
      } catch (e) {
        console.error('Failed to persist custom bundle', e);
      }
      return updated;
    });
    setSelectedBundle(newBundle);
  };

  const deleteBundle = (bundleId: string) => {
    setBundles(prev => {
      const updated = prev.filter(b => b.id !== bundleId);
      try {
        const customOnly = updated.filter(b => !SEED_BUNDLES.some(sb => sb.id === b.id));
        localStorage.setItem(LOCAL_BUNDLES_KEY, JSON.stringify(customOnly));
      } catch (e) {
        console.error('Failed to persist bundle deletion', e);
      }
      return updated;
    });
    if (selectedBundle?.id === bundleId) {
      setSelectedBundle(SEED_BUNDLES[0]);
    }
  };

  const addIncidentReport = (incidentData: Omit<IncidentReport, 'id' | 'createdAt'>) => {
    const newInc: IncidentReport = {
      ...incidentData,
      id: `INC-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString()
    };
    setIncidents(prev => {
      const updated = [newInc, ...prev];
      try {
        const customIncidents = updated.filter(i => !SEED_INCIDENTS.some(si => si.id === i.id));
        localStorage.setItem(LOCAL_INCIDENTS_KEY, JSON.stringify(customIncidents));
      } catch (e) {
        console.error('Failed to persist incident', e);
      }
      return updated;
    });
  };

  const addFeedbackReport = (feedbackData: Omit<UserFeedbackReport, 'id' | 'submittedAt'>) => {
    const newFb: UserFeedbackReport = {
      ...feedbackData,
      id: `FB-${Date.now().toString().slice(-6)}`,
      submittedAt: new Date().toISOString()
    };
    setFeedbacks(prev => {
      const updated = [newFb, ...prev];
      try {
        localStorage.setItem(LOCAL_FEEDBACK_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to persist feedback', e);
      }
      return updated;
    });
  };

  const openSkillModal = (skillId: string) => {
    const found = skills.find(s => s.id === skillId);
    if (found) {
      setSelectedSkill(found);
    }
  };

  const openBundleInComposer = (bundleId: string) => {
    const found = bundles.find(b => b.id === bundleId);
    if (found) {
      setSelectedBundle(found);
      setActiveTab('composer');
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        skills,
        bundles,
        incidents,
        feedbacks,
        selectedSkill,
        setSelectedSkill,
        selectedBundle,
        setSelectedBundle,
        searchQuery,
        setSearchQuery,
        selectedAgent,
        setSelectedAgent,
        selectedCategory,
        setSelectedCategory,
        selectedRiskTier,
        setSelectedRiskTier,
        clearFilters,
        saveCustomBundle,
        deleteBundle,
        addIncidentReport,
        addFeedbackReport,
        openSkillModal,
        openBundleInComposer
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
