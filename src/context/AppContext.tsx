import React, { createContext, useContext, useState } from 'react';
import { Skill, Bundle, IncidentReport, UserFeedbackReport, AgentTarget, RiskTier } from '../types';
import { SEED_SKILLS, SEED_BUNDLES, SEED_INCIDENTS } from '../data/seedData';

export type ActiveTab = 'catalog' | 'composer' | 'integration' | 'simulation' | 'governance' | 'docs' | 'settings';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  organization: string;
  joinedAt: string;
}

export interface IntegrationStatus {
  id: string;
  name: string;
  agentTarget: AgentTarget | 'github' | 'vercel';
  connected: boolean;
  version: string;
  lastSyncAt: string | null;
  apiKeySet: boolean;
}

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Auth & Account State
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Integrations State
  integrations: IntegrationStatus[];
  toggleIntegration: (id: string) => void;
  integrationApiKeys: Record<string, string>;
  saveIntegrationApiKey: (id: string, key: string) => void;

  // Catalog & Bundles Data
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
const LOCAL_USER_KEY = 'skillweave_user_session_v1';
const LOCAL_KEYS_KEY = 'skillweave_integration_keys_v1';

const DEFAULT_USER: UserProfile = {
  id: 'usr-dev-992',
  name: 'Alex Vance',
  email: 'alex.vance@skillweave.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Lead AI System Architect',
  organization: 'Acme Autonomous Labs',
  joinedAt: '2026-01-15T00:00:00Z'
};

const DEFAULT_INTEGRATIONS: IntegrationStatus[] = [
  {
    id: 'claude-desktop',
    name: 'Claude Desktop App',
    agentTarget: 'claude-desktop',
    connected: true,
    version: 'v0.7.1',
    lastSyncAt: new Date().toISOString(),
    apiKeySet: true
  },
  {
    id: 'cursor',
    name: 'Cursor AI Editor',
    agentTarget: 'cursor',
    connected: true,
    version: 'v0.42.3',
    lastSyncAt: new Date().toISOString(),
    apiKeySet: true
  },
  {
    id: 'windsurf',
    name: 'Windsurf Cascade Agent',
    agentTarget: 'windsurf',
    connected: false,
    version: 'v1.2.0',
    lastSyncAt: null,
    apiKeySet: false
  },
  {
    id: 'openhands',
    name: 'OpenHands Autonomous Agent',
    agentTarget: 'openhands',
    connected: true,
    version: 'v0.11.0',
    lastSyncAt: new Date().toISOString(),
    apiKeySet: true
  },
  {
    id: 'cli',
    name: 'SkillWeave Universal CLI',
    agentTarget: 'cli',
    connected: true,
    version: 'v1.0.0-release',
    lastSyncAt: new Date().toISOString(),
    apiKeySet: true
  },
  {
    id: 'github',
    name: 'GitHub Action Sync',
    agentTarget: 'github',
    connected: true,
    version: 'v2.0.0',
    lastSyncAt: new Date().toISOString(),
    apiKeySet: true
  },
  {
    id: 'vercel',
    name: 'Vercel Preview Deployer',
    agentTarget: 'vercel',
    connected: false,
    version: 'v1.0.0',
    lastSyncAt: null,
    apiKeySet: false
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // User auth state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse user session', e);
    }
    return DEFAULT_USER;
  });

  const isAuthenticated = !!user;

  const login = (email: string, name?: string) => {
    const newProfile: UserProfile = {
      ...DEFAULT_USER,
      email,
      name: name || email.split('@')[0].replace('.', ' ')
    };
    setUser(newProfile);
    try {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newProfile));
    } catch (e) {
      console.error('Failed to save user session', e);
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(LOCAL_USER_KEY);
    } catch (e) {
      console.error('Failed to remove user session', e);
    }
  };

  // Integration Status & API Keys
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>(DEFAULT_INTEGRATIONS);
  const [integrationApiKeys, setIntegrationApiKeys] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_KEYS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse API keys', e);
    }
    return {
      'claude-desktop': 'sk-claude-demo-key-889123',
      cursor: 'sk-cursor-demo-key-109283',
      openhands: 'sk-openhands-demo-key-556123'
    };
  });

  const toggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextState = !item.connected;
          return {
            ...item,
            connected: nextState,
            lastSyncAt: nextState ? new Date().toISOString() : null
          };
        }
        return item;
      })
    );
  };

  const saveIntegrationApiKey = (id: string, key: string) => {
    setIntegrationApiKeys(prev => {
      const updated = { ...prev, [id]: key };
      try {
        localStorage.setItem(LOCAL_KEYS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save API key', e);
      }
      return updated;
    });

    setIntegrations(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            apiKeySet: key.trim().length > 0,
            connected: key.trim().length > 0
          };
        }
        return item;
      })
    );
  };

  // Skills & Bundles State
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
        user,
        isAuthenticated,
        login,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        integrations,
        toggleIntegration,
        integrationApiKeys,
        saveIntegrationApiKey,
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
