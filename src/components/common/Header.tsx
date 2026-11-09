import React from 'react';
import { GeometricAccent } from './GeometricAccent';

interface HeaderProps {
  currentTab: string;
  onOpenHelpHub: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHelpHub,
  onOpenSettings
}) => {
  return (
    <header className="header" role="banner">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <GeometricAccent variant="medallion" size={26} opacity={0.85} />
        <div>
          <h1 style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: 'var(--text-primary)' }}>
            Unscroll
          </h1>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* 1-tap Persistent Help Hub link required across all views */}
        <button
          onClick={onOpenHelpHub}
          className="btn-subtle"
          style={{
            padding: '5px 10px',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--accent-teal)',
            backgroundColor: 'var(--accent-teal-subtle)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
            cursor: 'pointer',
            minHeight: '32px'
          }}
          aria-label="Open Help Hub and Campus Counselor contact"
        >
          Help Hub
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="btn-subtle"
          style={{
            padding: '5px 8px',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
            cursor: 'pointer',
            minHeight: '32px'
          }}
          aria-label="Settings"
        >
          Settings
        </button>
      </div>
    </header>
  );
};
