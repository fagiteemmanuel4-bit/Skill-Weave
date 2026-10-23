import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CatalogView } from './components/CatalogView';
import { ComposerView } from './components/ComposerView';
import { SimulationView } from './components/SimulationView';
import { GovernanceView } from './components/GovernanceView';
import { SkillDetailModal } from './components/SkillDetailModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'catalog' && <CatalogView />}
        {activeTab === 'composer' && <ComposerView />}
        {activeTab === 'simulation' && <SimulationView />}
        {activeTab === 'governance' && <GovernanceView />}
        {activeTab === 'docs' && <CatalogView />}
      </main>

      <Footer />
      <SkillDetailModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
