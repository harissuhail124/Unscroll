import React from 'react';

export type TabKey = 'pause' | 'swap' | 'reflect' | 'reach';

interface NavigationProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: 'pause', label: 'Pause' },
  { key: 'swap', label: 'Swap' },
  { key: 'reflect', label: 'Reflect' },
  { key: 'reach', label: 'Reach' }
];

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main application tabs">
      <div className="bottom-nav-inner">
        {TABS.map((tab) => {
          const isActive = currentTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              className={`nav-tab ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`${tab.label} tab`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
