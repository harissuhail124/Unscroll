import React, { useState, useEffect } from 'react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { Header } from './components/common/Header';
import { Navigation, TabKey } from './components/common/Navigation';
import { FirstRunModal } from './components/common/FirstRunModal';
import { HelpHubModal } from './components/common/HelpHubModal';
import { SettingsView } from './components/settings/SettingsView';
import { PauseView } from './components/pause/PauseView';
import { SwapView } from './components/swap/SwapView';
import { ReflectView } from './components/reflect/ReflectView';
import { ReachView } from './components/reach/ReachView';
import { Mood } from './types';

const AppContent: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [currentTab, setCurrentTab] = useState<TabKey>('pause');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpHubOpen, setIsHelpHubOpen] = useState(false);
  const [activeMoodForSwap, setActiveMoodForSwap] = useState<Mood>('Bored');

  // Sync with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabKey | 'settings' | 'helphub';
      if (hash === 'settings') {
        setIsSettingsOpen(true);
      } else if (hash === 'helphub') {
        setIsHelpHubOpen(true);
      } else if (['pause', 'swap', 'reflect', 'reach'].includes(hash)) {
        setCurrentTab(hash as TabKey);
        setIsSettingsOpen(false);
        setIsHelpHubOpen(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: TabKey) => {
    setCurrentTab(tab);
    setIsSettingsOpen(false);
    setIsHelpHubOpen(false);
    window.location.hash = `#${tab}`;
  };

  const handleNavigateToSwapWithMood = (mood: Mood) => {
    setActiveMoodForSwap(mood);
    handleSelectTab('swap');
  };

  return (
    <div className="app-container">
      {/* First-Run Modal */}
      <FirstRunModal
        isOpen={!settings.hasSeenFirstRun}
        onClose={() => updateSettings({ hasSeenFirstRun: true })}
      />

      {/* Help Hub Modal (1-tap access from anywhere) */}
      <HelpHubModal
        isOpen={isHelpHubOpen}
        onClose={() => {
          setIsHelpHubOpen(false);
          window.location.hash = `#${currentTab}`;
        }}
      />

      <Header
        currentTab={currentTab}
        onOpenHelpHub={() => {
          setIsHelpHubOpen(true);
          window.location.hash = '#helphub';
        }}
        onOpenSettings={() => {
          setIsSettingsOpen(true);
          window.location.hash = '#settings';
        }}
      />

      <main className="main-content" role="main">
        {isSettingsOpen ? (
          <SettingsView onBack={() => handleSelectTab(currentTab)} />
        ) : (
          <>
            {currentTab === 'pause' && (
              <PauseView onNavigateToSwap={handleNavigateToSwapWithMood} />
            )}

            {currentTab === 'swap' && (
              <SwapView initialMood={activeMoodForSwap} />
            )}

            {currentTab === 'reflect' && (
              <ReflectView />
            )}

            {currentTab === 'reach' && (
              <ReachView />
            )}
          </>
        )}
      </main>

      <Navigation currentTab={currentTab} onSelectTab={handleSelectTab} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
};

export default App;
