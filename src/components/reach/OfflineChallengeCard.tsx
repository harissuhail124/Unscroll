import React, { useState, useEffect } from 'react';
import { OFFLINE_CHALLENGES, OfflineChallenge } from '../../data/offlineChallenges';
import { SafeStorage, STORAGE_KEYS } from '../../services/storage';
import { recordActiveToday } from '../../services/streak';
import { GeometricAccent } from '../common/GeometricAccent';

export const OfflineChallengeCard: React.FC = () => {
  // Determine current week index (0 to 3) based on current month & date
  const now = new Date();
  const weekNumber = Math.floor(now.getDate() / 7) % OFFLINE_CHALLENGES.length;
  const challenge: OfflineChallenge = OFFLINE_CHALLENGES[weekNumber];

  const currentYearWeekKey = `${now.getFullYear()}-W${Math.ceil(now.getDate() / 7)}`;

  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    const saved = SafeStorage.getItem<Record<string, boolean>>(STORAGE_KEYS.OFFLINE_CHALLENGE, {});
    return !!saved[currentYearWeekKey];
  });

  useEffect(() => {
    const saved = SafeStorage.getItem<Record<string, boolean>>(STORAGE_KEYS.OFFLINE_CHALLENGE, {});
    saved[currentYearWeekKey] = isCompleted;
    SafeStorage.setItem(STORAGE_KEYS.OFFLINE_CHALLENGE, saved);
  }, [isCompleted, currentYearWeekKey]);

  const handleToggle = () => {
    setIsCompleted((prev) => {
      const next = !prev;
      if (next) {
        recordActiveToday();
      }
      return next;
    });
  };

  return (
    <section className="card" style={{ padding: '18px 16px', position: 'relative' }}>
      <GeometricAccent variant="watermark" opacity={0.05} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--accent-gold)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          Weekly offline challenge
        </span>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          {challenge.recommendedDuration}
        </span>
      </div>

      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
        {challenge.title}
      </h3>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
        {challenge.description}
      </p>

      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 12px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: isCompleted ? 'var(--accent-emerald-subtle)' : 'var(--bg-card-subtle)',
          border: isCompleted ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
          cursor: 'pointer'
        }}
      >
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
          style={{ width: '18px', height: '18px', accentColor: 'var(--accent-emerald)' }}
        />
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isCompleted ? 'var(--accent-emerald-text)' : 'var(--text-primary)' }}>
          {isCompleted ? 'Challenge completed this week!' : 'Mark challenge as completed'}
        </span>
      </label>
    </section>
  );
};
