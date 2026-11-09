import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';

interface BreathingCircleProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const BreathingCircle: React.FC<BreathingCircleProps> = ({ onComplete, onCancel }) => {
  const { settings } = useSettings();
  const [secondsRemaining, setSecondsRemaining] = useState(30);

  // 12s cycle: Inhale (0-4s), Hold (4-7s), Exhale (7-12s)
  const cycleSeconds = (30 - secondsRemaining) % 12;
  let phaseText = 'Inhale deeply through your nose...';
  if (cycleSeconds >= 4 && cycleSeconds < 7) {
    phaseText = 'Hold gently...';
  } else if (cycleSeconds >= 7) {
    phaseText = 'Exhale slowly out your mouth...';
  }

  useEffect(() => {
    if (secondsRemaining <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining, onComplete]);

  return (
    <div className="card" style={{ textAlign: 'center', padding: '24px 16px' }}>
      {settings.faithFeatures && (
        <div
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--accent-emerald-subtle)',
            color: 'var(--accent-emerald-text)',
            borderRadius: 'var(--radius-full)',
            padding: '4px 14px',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '14px',
            border: '1px solid var(--accent-emerald)'
          }}
        >
          Say Bismillah and breathe
        </div>
      )}

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
        Take a 30-second breath
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '8px' }}>
        Give your mind a pause before diving into the screen.
      </p>

      {/* Animated Circle (CSS Only, respect prefers-reduced-motion) */}
      <div className="breathing-circle-outer" aria-hidden="true">
        <div style={{ textAlign: 'center', padding: '12px' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-emerald-text)' }}>
            {secondsRemaining}s
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            remaining
          </div>
        </div>
      </div>

      <div
        aria-live="polite"
        style={{
          minHeight: '28px',
          fontSize: '0.95rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '18px'
        }}
      >
        {phaseText}
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '240px',
          height: '6px',
          backgroundColor: 'var(--border-subtle)',
          borderRadius: 'var(--radius-full)',
          margin: '0 auto 20px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${((30 - secondsRemaining) / 30) * 100}%`,
            height: '100%',
            backgroundColor: 'var(--accent-emerald)',
            transition: 'width 1s linear'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={onCancel}
          className="btn btn-secondary"
          style={{ padding: '8px 18px', fontSize: '0.85rem' }}
        >
          Cancel
        </button>
        <button
          onClick={onComplete}
          className="btn btn-subtle"
          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
        >
          Skip to End
        </button>
      </div>
    </div>
  );
};
